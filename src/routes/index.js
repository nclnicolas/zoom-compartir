import React from 'react'
import App from '../App'
import Pdf from '../Pdf'
import {Routes, Route} from 'react-router-dom';

const index = () => {
  return (
    <>
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pdf" element={<Pdf />} />
        </Routes>
    </>
  )
}

export default index