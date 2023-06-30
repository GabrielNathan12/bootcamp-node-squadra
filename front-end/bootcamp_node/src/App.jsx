import  { useState, useEffect } from 'react';
import Login from './telas/autenticacao/Login';
import Cadastro from './telas/cadastro/Cadastro';
import Municipio from './telas/municipio/Municipio';
import UF from './telas/UF/UF';
import Bairro from './telas/bairro/Bairro';
import './App.css';
import axios from 'axios';
import conectarBackend from './servidor/ConexaoServidor';

function App() {
  const [loginVisible, setLoginVisible] = useState(false);
  const [cadastroVisible, setCadastroVisible] = useState(false);
  const [ufVisible, setUfVisible] = useState(false);
  const [municipioVisible, setMunicipioVisible] = useState(false);
  const [bairroVisivel, setBairroVisivel] = useState(false);
  const [dados, setDados] = useState([]);

  useEffect(() => {
    buscarDados();
  }, []);

  
  function buscarDados(){
    axios
      .all([
        conectarBackend.get('/uf'),
        conectarBackend.get('/municipio'),
        conectarBackend.get('/bairro')
      ])
      .then(
        axios.spread((resUf, resMunicipio, resBairro) => {
          const todosDados = [
            ...resUf.data,
            ...resMunicipio.data,
            ...resBairro.data,
          ];
          setDados(todosDados);
        })
      )
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <div className='conteudo-principal'>
      <h1>Api: Cadastro de UF(Unidade Federativa)</h1>
      <ul>
        {dados.map((dado, i ) => (
          <li key={i}>CodigoUF: {dado.codigoUF} Nome: {dado.nome} Sigla: {dado.sigla}</li>
        ))}
      </ul>
      <nav>
        <ul>
          <li onClick={() => setLoginVisible(!loginVisible)}>Login</li>
          <li onClick={() => setCadastroVisible(!cadastroVisible)}>Cadastro</li>
          <li onClick={() => setUfVisible(!ufVisible)}>UF</li>
          <li onClick={() => setMunicipioVisible(!municipioVisible)}>Município</li>
          <li onClick={() => setBairroVisivel(!bairroVisivel)}>Bairro</li>
        </ul>
      </nav>

      {loginVisible && <Login />}
      {cadastroVisible && <Cadastro />}
      {ufVisible && <UF />}
      {municipioVisible && <Municipio />}
      {bairroVisivel && <Bairro/>}

    </div>
  );
}

export default App;
