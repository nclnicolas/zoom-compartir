import React from 'react'

const Pdf = () => {
  return (
    <>
    <h1>Hola</h1>
        <div style={{position: 'absolute', width: '100%', heigth: '100%'}}>
            <object
            data={require('./assets/img/Telecentro.pdf')}
            type='application/pdf'
            width='100%'
            heigth='100%'
            >

            </object>
        </div>
    </>
  )
}

export default Pdf;