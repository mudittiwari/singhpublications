import React, { useState, useEffect, useRef } from 'react';
import { usePdf } from 'react-pdf-js';
import file from '../src/assets/terms.pdf'
const MyPdfViewer = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);

  const renderPagination = (page, pages) => {
    if (!pages) {
      return null;
    }
    let previousButton = <li className="previous" onClick={() => setPage(page - 1)}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    }
    let nextButton = <li className="next" onClick={() => setPage(page + 1)}>Next <i className="fa fa-arrow-right"></i></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    );
  }

  const canvasEl = useRef(null);

  const [loading, numPages] = usePdf({
    file: file,
    scale:2,
    page,
    canvasEl
  });

  useEffect(() => {
    setPages(numPages);
    // console.log(numPages)
  }, [numPages]);

  return (
    <div>
      {loading && <span>Loading...</span>}
      <div className='flex justify-center mt-10 flex-col items-center'>
      <canvas ref={canvasEl} />
      </div>
      {renderPagination(page, pages)}
    </div>
  );
}

export default MyPdfViewer;