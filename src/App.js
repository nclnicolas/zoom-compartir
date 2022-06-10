import './App.css';
import React, { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import Telecentro from "./assets/img/Telecentro.pdf";


function App() {

  const[numPages, setnumPages] = useState(null);
  const[pageNumber, setPageNumber] = useState(1);
  const[files, setFiles] = useState([]);

  function onDocumentLoadSuccess({numPages}){
    setnumPages(numPages);
    setPageNumber(1);
  }


  const shareData = async () => {
    if(navigator.canShare && navigator.canShare({files:files})){
      await navigator.share({
        share_target:{
          method:'POST',
          enctype:"multipart/form-data"
        },
        title:'Probando Share',
        text: "Hola como estas",
        files: files[{
          name:'records',
          accept: ['text/pdf', '.pdf']
        },
      {
        name: "graphs",
        accept: "image/svg+xml"
      }]
      })
    }else{
      console.log('No paso');
    }
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
          
        <h4>Compartir Archivito</h4>
        <input type='file' multiple onChange={(e) => {setFiles(e.target.files)}} ></input>
        <button onClick={() => {shareData()}}>Compartir</button>
    </>
  );
}

export default App;


/* useEffect(() => {
    async function getArchivo(){
      const archivo = await {Telecentro};
      const blob = await archivo.blob;
      const file = new File([blob], 'archivo.pdf', {type: 'archivo/pdf'});
      setFile(file)
    }
    getArchivo();
  })
  
  const archivoPdf = {
    title: "Archivo pdf",
    text: "Compartimos archivo",
    files: [file]
  }

  function compartirArchivo(objeto){
    if(navigator.share){
      navigator
      .share(objeto)
      .then(() => console.log("Exito"))
      .catch(err => console.log("Error", err))
    }else{
      console.log("No soportado");
    }
  } */