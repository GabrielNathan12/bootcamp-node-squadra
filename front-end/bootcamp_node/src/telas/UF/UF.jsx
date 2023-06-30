import  { useEffect, useState } from 'react';
import conectarBackend from '../../servidor/ConexaoServidor';
import '../estilos/ufEstilo.css';

const UF = () => {
  const [ufs, setUfs] = useState([]);
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const trazerListaUf = async () => {
      try {
        const response = await conectarBackend.get('/uf');
        setUfs(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados do servidor:', error);
      }
    };

    trazerListaUf();
  }, []);

  const cadastrarUf = async () => {
    try {
      const novaUf = {
        nome: nome,
        sigla: sigla,
        status: status
      };

      const response = await conectarBackend.post('/uf', novaUf);
      setUfs([...ufs, response.data]);
      setNome('');
      setSigla('');
      setStatus(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container-uf'>
      <ul className='container-uf-ul'>
        {ufs.map((uf) => (
          <li key={uf.codigoUF} className='uf-lista'>
            Nome: {uf.nome} Sigla: {uf.sigla} Status: {uf.status}
          </li>
        ))}
      </ul>
      <div className='cadastro-uf'>
        <label>
          Nome do Estado:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <label>
          Sigla:
          <input type="text" value={sigla} onChange={(e) => setSigla(e.target.value)} />
        </label>
        <label>
          Status:
          <input
            type="number"
            min={0}
            max={1}
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
          />
        </label>
        <div>
          <button type="submit" onClick={cadastrarUf}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default UF;
