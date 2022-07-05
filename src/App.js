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
    if(navigator.share && navigator.canShare({files:files})){
      await navigator.share({
        title: 'Hola buen dia',
        text: 'Hola hola',
        files: files
      })
    }else{
      console.log('No paso');
    }
  }



const [scale, setScale] = useState();
const [pann, setPann] = useState(true);

const scrollear = () => {
  setPann(!pann)
}
  return (
    <>
      Holis
      <TransformWrapper
         defaultScale={1}
         /* initialPositionX={100}
         initialPositionY={200} */
         /* disabled={true} */
         /* centerOnInit
         centerZoomedOut */
          /* alignmentAnimation={{ disabled: true}} */
          panning={{disabled:pann, velocityDisabled: true }} //desactiva vista panoramica

          doubleClick={{mode: scale}}
          /* onZoomStart={(e) => {
            if(e.instance.setup.doubleClick.mode !== 'zoomIn'){
              setPann(false)
            }else{
              setPann(true)
            }
          }} */

          onPanningStop={(e) => {
              if (e.instance.setup.doubleClick.mode !== 'zoomIn' ) {
                setScale('zoomIn')
                scrollear();
              }
              else {
                setScale('reset')
              }
  }}
          
        >
          <TransformComponent >
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