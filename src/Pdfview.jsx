import React, { useState, useEffect, useRef } from 'react';
import { usePdf } from 'react-pdf-js';
import file from '../src/assets/file.pdf'
const MyPdfViewer = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);

  const renderPagination = (page, pages) => {
    if (!pages) {
      return null;
    }
    let previousButton = <li className="previous w-1/2 py-5 bg-[#ff7550] text-white border-none cursor-pointer hover:opacity-[0.9]" onClick={() => setPage(page - 1)}><i className="fa fa-arrow-left"></i> Previous</li>;
    if (page === 1) {
      previousButton = <li className="previous w-1/2 py-5 bg-[#ff7550] text-white border-none cursor-pointer hover:opacity-[0.9] disabled" onClick={() => setPage(page - 1)}><i className="fa fa-arrow-left"></i> Previous</li>;
    }
    let nextButton = <li className="next w-1/2 py-5 bg-[#ff7550] text-white border-none cursor-pointer hover:opacity-[0.9]" onClick={() => setPage(page + 1)}>Next <i className="fa fa-arrow-right"></i></li>;
    if (page === pages) {
      nextButton = <li className="next w-1/2 py-5 disabled bg-[#ff7550] text-white border-none cursor-pointer hover:opacity-[0.9]" onClick={() => setPage(page + 1)}>Next <i className="fa fa-arrow-right"></i></li>;
    }
    return (
      <nav>
        <ul className="pager flex gap-0.5 text-center">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    );
  }

  const canvasEl = useRef(null);

  const [loading, numPages] = usePdf({
    file: file,
    scale: 2,
    page,
    canvasEl
  });

  useEffect(() => {
    setPages(numPages);
    // console.log(numPages)
  }, [numPages]);

  return (
    <div className='bg-gray-500'>
      {loading && <span>Loading...</span>}
      <div className='flex justify-center flex-col items-center'>
        <canvas className="m-auto h-[84vh] w-full md:w-auto object-contain" ref={canvasEl} />
      </div>
      {renderPagination(page, pages)}
    </div>
  );
}

export default MyPdfViewer;