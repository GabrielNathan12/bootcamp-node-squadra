import { useNavigate  } from 'react-router-dom';
import '../estilos/Endereco.css';
import { useState } from 'react';
import ConectarBackend from '../servidor/ConexaoServidor';

const Endereco = () => {
  const navegacao = useNavigate ();
  const [codigoPessoa , setCodigoPessoa] = useState();
  const [codigoBairro, setCodigoBairro] = useState();
  const [nomeRua, setNomeRua] = useState();
  const [numero, setNumero] = useState();
  const [complemento, setComplemento] = useState();
  const [cep, setCep] = useState();
  const [status, setStatus] = useState();

  const criarEndereco = async () =>{
    if(!codigoPessoa || !codigoBairro || !nomeRua || !numero || !complemento || !status){
      alert("Por favor preencha todos os campus");
    }

    const iStatus = parseInt(status);
    const novoEndereco = {codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep, iStatus};

    try{
      await ConectarBackend.post('/endereco', novoEndereco);
      alert("Endereco incluido com sucesso");
      navegacao('/');
    }catch(error){ 
      alert(error);
    }
  }
  
  
  return (
    <div className="novo-endereco">
      <h2>Inserir novo Endereço</h2>
      <form>
        <div className="form-control">
          <label htmlFor="title">Codigo Pessoa:</label>
          <input type="text" name="codigo-pessoa" value={codigoPessoa} placeholder="Digite o codigo da pessoa" onChange={(e => setCodigoPessoa(e.target.value))}/>
        </div>
        <div className="form-control">
          <label htmlFor="nome">Codigo do Bairro:</label>
          <input type="text" name="codigo-bairro" value={codigoBairro} placeholder="Digite o codigo do bairro"onChange={(e => setCodigoBairro(e.target.value))}/>
        </div>
        <div className="form-control">
          <label htmlFor="status">Nome da Rua:</label>
         
          <input type="text" name="nome-rua"  value={nomeRua} placeholder="O nome da Rua" min={0} onChange={(e => setNomeRua(e.target.value))}/>
        </div>
        <div className="form-control">
          <label htmlFor="status">Numero da Rua:</label>
         
          <input type="text" name="numero-rua"  value={numero} placeholder="Numero da Rua" onChange={(e => setNumero(e.target.value))}/>
        </div>
        <div className="form-control">
          <label htmlFor="complemeto">Complemento:</label>
         
          <input type="text" name="complemeto" value={complemento} placeholder="Digite o complemento" onChange={(e => setComplemento(e.target.value))}/>
        </div>
        <div className="form-control">
          <label htmlFor="cep">CEP:</label>
         
          <input type="text" name="cep" value={cep} placeholder="Digite o CEP" onChange={(e => setCep(e.target.value))}/>
        </div>
        
        <div className="form-control">
          <label htmlFor="status">Status:</label>
         
          <input type="number" name="status" value={status} placeholder="Digite o Status" min={0} max={1} onChange={(e => setStatus(e.target.value))}/>
        </div>
        
        <button type="submit" onClick={criarEndereco}>Enviar</button>
      </form>
    </div>
  )
}

export default Endereco;