import './App.css';
import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import Telecentro from "./assets/img/Telecentro.pdf";


function App() {

  const[numPages, setnumPages] = useState(null);
  const[pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({numPages}){
    setnumPages(numPages);
    setPageNumber(1);
  }

  const share = () => {
    navigator.share({
      title:'Probando Share',
      text: 'Probando Compartir',
      url: {Telecentro}
    })

  }

  return (
    <>
      Holis
      <TransformWrapper
         defaultScale={1}
          /* defaultPositionX={100}
          defaultPositionY={200} */
          
          alignmentAnimation={{ sizeX:50}}
          panning={{ disabled: true , velocityDisabled: true }} //desactiva vista panoramica 
        >
          <TransformComponent>
      <div >
      <Document className="document-scroll" file={Telecentro} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(
          new Array(numPages),
          (el, index) => (
            <Page 
            key={`page_${index+1}`}
            pageNumber={index+1}
            />
          )
        )}
      </Document>
      </div>
      </TransformComponent>
        </TransformWrapper>
          
        <h4>Compartir Archivo</h4>
        <button onClick={share}>Compartir</button>
    </>
  );
}

export default App;
