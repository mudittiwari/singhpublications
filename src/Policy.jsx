import React from "react";
import policy from './assets/policy.pdf';
function Policy()
{
    return (
        <div className="w-full h-screen">
          <iframe src={policy}   title="testPdf" height="100%" width="100%"/>
          </div>
      );
}
export default Policy;