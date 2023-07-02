import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './rotas/Home';
import Pessoa from './rotas/Pessoa';
import Bairro from './rotas/Bairro';
import Municipio from './rotas/Municipio';
import Endereco from './rotas/Endereco';
import UFs from './rotas/UFs';

const routing = (
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='/pessoa' element={<Pessoa />} />
          <Route path='/bairro' element={<Bairro />} />
          <Route path='/uf' element={<UFs />} />
          <Route path='/municipio' element={<Municipio />} />
          <Route path='/endereco' element={<Endereco />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(routing, document.getElementById('root'));
