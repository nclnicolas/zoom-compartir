import React from 'react'
import App from '../App'
import Pdf from '../Pdf'
import {Routes, Route} from 'react-router-dom';
import PdfSec from '../PdfSec';

const index = () => {
  return (
    <>
        <Routes>
        <Route path="/zoom-compartir" element={<App />} />
        <Route path="/pdf" element={<Pdf />} />
        <Route path="/pdfSec" element={<PdfSec />} />
        </Routes>
    </>
  )
}

export default index