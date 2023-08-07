import { useNavigate  } from 'react-router-dom';
import '../estilos/Bairro.css';
import { useState } from 'react';
import ConectarBackend from '../servidor/ConexaoServidor';

const Bairro = () => {
  const navegacao = useNavigate ();
  const [codigoMunicipio , setCodigoMunicipio] = useState();
  const [nome, setNome] = useState();
  const [status, setStatus] = useState();


  const criarBairro = async () =>{
     
    if(!codigoMunicipio || !nome || !status){
      alert("Por favor preecha todos os campos");
    }

    const iStatus = parent(status);

    const novoBairro = {codigoMunicipio, nome, iStatus};
    try{
        await ConectarBackend.post('/bairro', novoBairro)
        navegacao('/');
        alert("Bairro incluido com sucesso");
    }
    catch(error){
      alert(error)
    }
  };
  
  
  
  return (
    <div className="novo-bairro">
      <h2>Inserir um novo Bairro</h2>
      <form>
        <div className="form-control">
          <label htmlFor="title">Codigo do Município:</label>
          <input type="text" name="codigo-municipio" value={codigoMunicipio} placeholder="Digite o codigo do municipio" onChange={(e => setCodigoMunicipio(e.target.value))}/>
        </div>
        <div className="form-control">
          <label htmlFor="nome">Nome do Bairro:</label>
          <input type="text" name="title" value={nome} placeholder="Digite o nome do bairro"onChange={(e => setNome(e.target.value))}/>
        </div>
        <div className="form-control">
          <label htmlFor="status">Status:</label>
         
          <input type="number" name="status" value={status} placeholder="Digite o Status" min={1} max={2} onChange={(e => setStatus(e.target.value))}/>
        </div>
        <button type="submit" onClick={criarBairro}>Enviar</button>
      </form>
    </div>
  )
}

export default Bairro;