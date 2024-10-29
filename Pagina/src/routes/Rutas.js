import React from 'react'
import {Routes,Route} from "react-router-dom";
import Home from '../componentes/home';
import Tabla from '../componentes/tabla';
function Rutas() {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/tabla' element={<Tabla/>}/>
        </Routes>
    </div>
  )
}

export default Rutas