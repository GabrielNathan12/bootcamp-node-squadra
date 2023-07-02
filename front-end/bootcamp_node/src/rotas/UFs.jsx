import { useNavigate } from 'react-router-dom';
import '../estilos/UF.css';
import { useState, useEffect } from 'react';
import ConectarBackend from '../servidor/ConexaoServidor';

const UFs = () => {
  const navegacao = useNavigate;
  const [nome, setNome] = useState();
  const [sigla, setSigla]= useState();
  const [status, setStatus] = useState();


  const criarUF = async () =>{
    const novoUF = {nome, sigla, status};

    await ConectarBackend.post('/uf',{
      body: novoUF
    });
    navegacao('/');

  }

  useEffect(() => {
    criarUF();
  });
  
  
  return (
    <div className="novo-uf">
      <h2>Inserir novo Estado:</h2>
      <form>
        <div className="form-control">
          <label htmlFor="title">Nome:</label>
          <input type="text" name="title" placeholder="Digite o nome do Estado" onChange={(e => setNome(e.target.value))}/>
        </div>
        <div className="form-control">
          <label htmlFor="sigla">Sigla:</label>
          <input type="text" name="title" placeholder="Digite a Sigla do Estado"onChange={(e => setSigla(e.target.value))}/>
        </div>
        <div className="form-control">
          <label htmlFor="status">Status:</label>
          <input type="number" name="status" placeholder="Digite o Status" min={0} max={1} onChange={(e => setStatus(e.target.value))}/>
        </div>
        <input type="submit">Enviar</input>
      </form>
    </div>
  )
}

export default UFs;