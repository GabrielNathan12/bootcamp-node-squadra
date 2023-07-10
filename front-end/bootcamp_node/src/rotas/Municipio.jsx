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
    
    if(!codigoUF || !nome || !status){
      alert("Por favor preecha todos os campos");
    }

    const iStatus = parent(status);

    const novoMuncipio = {codigoUF, nome, iStatus};
    try{
        await ConectarBackend.post('/municipio', novoMuncipio)
        navegacao('/');
        alert("Municipio incluido com sucesso");
    }
    catch(error){
      alert(error)
    }
  };
  
  return (
    <div className="novo-municipio">
      <h2>Inserir novo Município</h2>
      <form onSubmit={criarMunicipio}>
        <div className="form-control">
          <label htmlFor="title">Codigo do Estado:</label>
          <input type="text" name="codigo-estado" value={codigoUF} placeholder="Digite o codigo do Estado" onChange={(e => setCodigoUF(e.target.value))}/>
        </div>
        <div className="form-control">
          <label htmlFor="nome">Nome do Municipio:</label>
          <input type="text" name="title" value={nome} placeholder="Digite o nome do municipio"onChange={(e => setNome(e.target.value))}/>
        </div>
        <div className="form-control">
          <label htmlFor="status">Status:</label>
         
          <input type="number" name="status" value={status} placeholder="Digite o Status" min={0} max={1} onChange={(e => setStatus(e.target.value))}/>
        </div>
        <button type="submit" onClick={criarMunicipio}>Enviar</button>
      </form>
    </div>
  )
}

export default Municipio;