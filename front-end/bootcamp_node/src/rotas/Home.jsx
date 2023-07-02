import { useState, useEffect } from "react";
import conectarBackend from "../servidor/ConexaoServidor";
import '../estilos/Home.css';

const  Home = () => {
  const [ufs, setUFs] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [bairros, setBairro] = useState([]);
  const [pessoas, setPessoas] = useState([]);
  const [enderecos, setEndereco] = useState([]);

  const buscarUfs = async () => {
    try {
      const resposta = await conectarBackend.get(`/uf`);
      setUFs(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const buscarMunicipios = async () => {
    try {
      const resposta = await conectarBackend.get(`/municipio`);
      setMunicipios(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };
  const buscarBairro = async () => {
    try {
      const resposta = await conectarBackend.get(`/bairro`);
      setBairro(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };
  const buscarPessoas = async () => {
    try {
      const resposta = await conectarBackend.get(`/pessoa`);
      setPessoas(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };
  const buscarEnderecos = async () => {
    try {
      const resposta = await conectarBackend.get(`/endereco`);
      setEndereco(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    buscarUfs();
  }, []);
  
  useEffect(() => {
    buscarMunicipios();
  }, []);
  
  useEffect(() => {
    buscarBairro();
  }, []);
  
  useEffect(() => {
    buscarPessoas();
  }, []);
  useEffect(() => {
    buscarEnderecos();
  }, []);

  return (
    <div className="home">
      <h1>Api UF (Unidades Federativas)</h1>
      <h2>Estados</h2>
      {ufs.length === 0 ? (
      <p>Carregando...</p>
      ) : (
        ufs.map((uf) => {
          return (
            <div className="ufs" key={uf.codigoUF}>
              <h2>Codigo UF:{uf.codigoUF}</h2>
              <h2>Nome: {uf.nome}</h2>
              <h3>Sigla: {uf.sigla}</h3>
              <h3>Status: {uf.status}</h3>
            </div>
          );
        })
      )}
      <div>
        <h2>Municípios</h2>
        {municipios.length === 0 ? (
          <p>Carregando...</p>
        ) : (
          municipios.map((municipio) =>  (
            <div className="municipios" key={municipio.codigoMunicipio}>
              <h2>Codigo Municipio: {municipio.codigoMunicipio}</h2>
              <h2>Nome: {municipio.nome}</h2>
              <h3>Status: {municipio.status}</h3>
             
            </div>
          ))
        )}
      </div>
      <div>
        <h2>Bairros</h2>
        {bairros.length === 0 ? (
          <p>Carregando...</p>
        ) : (
          bairros.map((bairro) => (
            <div className="bairro" key={bairro.codigoBairro}>
              <h2>Codigo Bairro: {bairro.codigoBairro}</h2>
              <h2>Localização: {bairro.nome}</h2>
              <h3>Status: {bairro.status}</h3>
            </div>
          ))
        )}
      </div>
      <div >
        <h2>Pessoas</h2>
        {pessoas.length === 0 ? (
          <p>Carregando...</p>
        ) : (
          pessoas.map((pessoa) => (
            <div className="pessoa" key={pessoa.codigoPessoa}>
              <h2>Codigo Pessoa: {pessoa.codigoPessoa}</h2>
              <h2>Nome: {pessoa.nome}</h2>
              <h3>Sobrenome: {pessoa.sobrenome}</h3>
              <h2>Idade: {pessoa.idade}</h2>
              <h2>Email: {pessoa.login}</h2>
              <h2>Status: {pessoa.status}</h2>
             
            </div>
          ))
        )}
      </div>
      <div >
        <h2>Endereço</h2>
        {enderecos.length === 0 ? (
          <p>Carregando...</p>
        ) : (
          enderecos.map((endereco) => (
            <div className="endereco" key={endereco.codigoEndereco}>
              <h2>Codigo Endereco: {endereco.codigoEndereco}</h2>
              <h2>Nome Rua: {endereco.nomeRua}</h2>
              <h3>Numero: {endereco.numero}</h3>
              <h3>Complemento: {endereco.complemento}</h3>
              <h3>CEP: {endereco.cep}</h3>
              <h3>Status: {endereco.status}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
