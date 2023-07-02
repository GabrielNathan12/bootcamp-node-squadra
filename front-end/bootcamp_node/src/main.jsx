import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './rotas/Home';
import Pessoa from './rotas/Pessoa';
import Bairro from './rotas/Bairro';
import UF from './rotas/UFs';
import Municipio from './rotas/Municipio';
import Endereco from './rotas/Endereco';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path= '/pessoa' element={<Pessoa/>} />
          <Route path='/bairro' element={<Bairro/>} />
          <Route path='/uf' element={<UF/>} />
          <Route path='/municipio' element={<Municipio/>} />
          <Route path='/endereco' element={<Endereco/>} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>,
);
