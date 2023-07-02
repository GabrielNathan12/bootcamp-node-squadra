import { useNavigate  } from 'react-router-dom';
import '../estilos/Municipio.css'
import { useState } from 'react';
import ConectarBackend from '../servidor/ConexaoServidor';

const Municipio = () => {
  const navegacao = useNavigate ();
  const [codigoUF , setCodigoUF] = useState();
  const [nome, setNome] = useState();
  const [status, setStatus] = useState();


  const criarMunicipio = async () =>{
    const novoMuncipio = {codigoUF, nome, status};

    await ConectarBackend.post('/municipio',{
      body: novoMuncipio
    });
    navegacao('/');
  }
  
  
  return (
    <div className="novo-municipio">
      <h2>Inserir novo Município</h2>
      <form>
        <div className="form-control">
          <label htmlFor="title">Codigo do Estado:</label>
          <input type="text" name="codigo-estado" placeholder="Digite o codigo do Estado" onChange={(e => setCodigoUF(e.target.value))}/>
        </div>
        <div className="form-control">
          <label htmlFor="nome">Nome do Municipio:</label>
          <input type="text" name="title" placeholder="Digite o nome do municipio"onChange={(e => setNome(e.target.value))}/>
        </div>
        <div className="form-control">
          <label htmlFor="status">Status:</label>
         
          <input type="number" name="status" placeholder="Digite o Status" min={0} max={1} onChange={(e => setStatus(e.target.value))}/>
        </div>
        <button type="submit" onClick={criarMunicipio}>Enviar</button>
      </form>
    </div>
  )
}

export default Municipio;