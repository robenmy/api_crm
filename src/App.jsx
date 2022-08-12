import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import IniciarSesion from '../src/layout/IniciarSesion'
import Layout from '../src/layout/Layout'
import Inicio from '../src/paginas/Inicio'
import LoginForm from './paginas/LoginForm'
import EditarCliente from './paginas/EditarCliente'
import NuevoCliente from './paginas/NuevoCliente'
import VerCliente from './paginas/VerCliente'


function App() {
 

  return (
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<IniciarSesion/>}>
          <Route index element={<LoginForm/>} />
          </Route>

          <Route path="/clientes" element={<Layout/>}>
              <Route index element={<Inicio/>} />
              <Route path="nuevo" element={<NuevoCliente/>} />
              <Route path='editar/:id' element={<EditarCliente/>} />
              <Route path=':id' element={<VerCliente/>} />
          </Route>
       </Routes>

    </BrowserRouter>
   
  )
}

export default App
