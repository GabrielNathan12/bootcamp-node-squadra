import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import Pessoa from './pages/Pessoa';
import Bairro from './pages/Bairro';
import Municipio from './pages/Municipio';
import Endereco from './pages/Endereco';
import UFs from './pages/UFs';
import Login from './pages/Login';

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
            <Route path='/autenticar' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(routing, document.getElementById('root'));
