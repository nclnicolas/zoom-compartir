import './App.css';
import React, { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import Telecentro from "./assets/img/Telecentro.pdf"


function App() {

  const[numPages, setnumPages] = useState(null);
  const[pageNumber, setPageNumber] = useState(1);
  const[files, setFiles] = useState(null);

  function onDocumentLoadSuccess({numPages}){
    setnumPages(numPages);
    setPageNumber(1);
  }

  /* const shareData = async () => {
    if(navigator.share && navigator.canShare({files:files})){
      await navigator.share({
        title: 'Hola buen dia',
        text: 'Hola hola',
        files: files
      })
    }else{
      console.log('No paso');
    }
  } */

  useEffect(() => {
    async function getArchivo(){
      const blob = await Telecentro;
      const titulo ='servicio_de_factura'
      const files = new File([blob], `${titulo}.pdf`, {type: 'application/pdf'});
      setFiles(files);
    }
    getArchivo();
  }, [])

  const archivo ={
    title: 'Web share con archivo',
    text: 'Ademas de textos',
    url: 'https://nico.com',
    files:[files]
  }

  function shareAcross(objeto){
    if(navigator.share){
      navigator
      .share(objeto)
      .then(() => console.log('Excelente'))
      .catch((err) => console.log(err))
    }else{
      console.log('No soportado');
    }
  }


const [scale, setScale] = useState(1);
const [pann, setPann] = useState(true);
const [zoom, setZoom] = useState('reset');


  return (
    <>
      Holanda
      <TransformWrapper
         centerOnInit
         initialScale={1}
          panning={{disabled:pann, velocityDisabled: true}} //desactiva vista panoramica
          doubleClick={{mode:zoom}}
           /* onZoom={() => console.log('onZoom')} */
          /* onPanning={() => console.log('onPanning')} */
          /* onPanningStop={() => console.log('onPanningStop')} */
         /*  onPanningStart={() => console.log('onPanningStar')} */
          /* onWheelStart={() => console.log('onWheelStar')} */
          /* onWheelStop={() => console.log('onWheelStop')} */
          onPanningStart={(e) => {
            if(e.state.scale !== 1){
              setZoom('reset')
              
              setPann(false)
              console.log('entro');
            }else{
              setZoom('zoomIn')
              
              setPann(true)
              console.log('salio');
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
          
        <h4>Compartir Archivo</h4>
        {/* <input type='file' multiple onChange={(e) => {setFiles(e.target.files)}} ></input>
        <button onClick={() => {shareData()}}>Compartir</button> */}
        <button onClick={() => shareAcross(archivo)}>Compartir</button>
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