import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import Telecentro from './assets/img/Telecentro.pdf'

const PdfSec = () => {
  const [numPages, setnumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setnumPages(numPages);
    setPageNumber(1);
  }

  return (
    <>
      <div>
        <Document
          className="document-scroll"
          file={Telecentro}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
    </>
  );
};

export default PdfSec;
