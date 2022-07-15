
import React, { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Telecentro from "./assets/img/Telecentro.pdf";
import {FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon} from 'react-share';
import { Link } from "react-router-dom";
import Pdf from './Pdf';
import PdfSec from './PdfSec'

function App() {
  const [numPages, setnumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState(null);

  const [show, setShow] = useState(false);//-------MODAL
  const handleClose = () => setShow(false);//-------MODAL
  const handleShow = () => setShow(true);//-------MODAL
  const shareUrl ={Telecentro};//-------MODAL

  function onDocumentLoadSuccess({ numPages }) {
    setnumPages(numPages);
    setPageNumber(1);
  }

  const shareData = async () => {
    if(navigator.share && navigator.canShare({files:file})){
      await navigator.share({
        title: 'Factura_Movistar_Mes_Julio.pdf',
        text: 'Factura_Movistar_Mes_Julio.pdf',
        files: file
      })
    }else{
      console.log('No paso');
    }
  }

  useEffect(() => {
    async function getArchivo() {
      const imagen = await fetch('Telecentro.pdf')
      console.log('aca vemos el fetch', imagen);
      const blob = await imagen.blob();
      const file = new File([blob], `ServicioFactura.pdf`, {
        type: "application/pdf",
      });
      setFile(file);
    }
    getArchivo();
  }, []);

  const archivo = {
    title: "Factura_Movistar_Mes_Julio.pdf",
    text: "Factura_Movistar_Mes_Julio.pdf",
    files: [file],
  };

  function shareAcross(objeto) {
    if (navigator.share) {
      navigator
        .share(objeto)
        .then(() => console.log("Excelente"))
        .catch((err) => console.log(err));
    } else {
      console.log("No soportado");
    }
  }

  const [scale, setScale] = useState(1);
  const [pann, setPann] = useState(true);
  const [zoom, setZoom] = useState("reset");

  return (
    <>
      {/* ---MODAL----- */}

      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FacebookShareButton
          url={shareUrl}
          quote={'Enviamos el archivo'}
          >
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>

          <WhatsappShareButton
          url={shareUrl}
          quote={'Enviamos el archivo'}
          >
            <WhatsappIcon size={40} round={true} />
          </WhatsappShareButton>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ------------------------------- */}


      Holanda
     { <TransformWrapper
        centerOnInit
        centerZoomedOut
        initialScale={1}
        panning={{ disabled: pann}} //desactiva vista panoramica
        doubleClick={{ mode: zoom, step: scale }}
        /* onZoom={() => console.log('onZoom')} */
        /* onPanning={() => console.log('onPanning')} */
        /* onPanningStop={() => console.log('onPanningStop')} */
        /*  onPanningStart={() => console.log('onPanningStar')} */
        /* onWheelStart={() => console.log('onWheelStar')} */
        /* onWheelStop={() => console.log('onWheelStop')} */
        onPanningStart={(e) => {
          if (e.state.scale !== 1) {
            setZoom("reset");
            setScale(-1);
            setPann(false);
            console.log("entro");
          } else {
            setZoom("zoomIn");
            setScale(1);
            setPann(true);
            console.log("salio");
          }
        }}
      >
        <TransformComponent>
          <div>
            <Document
              className="document-scroll"
              /* file={Telecentro} */
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
        </TransformComponent>
      </TransformWrapper>}
      <h4>Compartir Archivo a travez de input!!!</h4>
      <input type='file' multiple onChange={(e) => {setFile(e.target.files)}} ></input>
        <button onClick={() => {shareData()}}>Compartir</button>
        <h4>Compartir Archivo</h4>
      <button onClick={() => shareAcross(archivo)}>Compartir</button>
      <h4>URL</h4>
      <Link to='/pdfSec'><button>Compartir</button></Link>
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
