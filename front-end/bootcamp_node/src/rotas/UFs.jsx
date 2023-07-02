import { useNavigate } from 'react-router-dom';
import '../estilos/UF.css';
import { useState } from 'react';
import ConectarBackend from '../servidor/ConexaoServidor';

const UFs = () => {
  const navegacao = useNavigate();
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [status, setStatus] = useState('');

  const criarUF = async () => {
    const iStatus = parseInt(status);
    const novoUF = { nome, sigla, status: iStatus };
    console.log(novoUF);
    await ConectarBackend.post('/uf', novoUF);
    navegacao('/');
  };

  return (
    <div className="novo-uf">
      <h2>Inserir novo Estado</h2>
      <form>
        <div className="form-control">
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" placeholder="Digite o nome do Estado" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="sigla">Sigla:</label>
          <input type="text" id="sigla" placeholder="Digite a Sigla do Estado" value={sigla} onChange={(e) => setSigla(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="status">Status:</label>
          <input type="number" id="status" placeholder="Digite o Status" min={0} max={1} value={status} onChange={(e) => setStatus(e.target.value)} />
        </div>
        <button type="submit" onClick={criarUF}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default UFs;
