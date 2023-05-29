import React from "react";
import terms from './assets/terms.pdf';
function Terms()
{
    return (
        <div className="w-full h-screen">
          <iframe src={terms}   title="testPdf" height="100%" width="100%"/>
          </div>
      );
}
export default Terms;