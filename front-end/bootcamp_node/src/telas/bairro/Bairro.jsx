import  { useEffect, useState } from 'react';
import conectarBackend from '../../servidor/ConexaoServidor';

const Bairro = () => {
  const [bairro, setBairro] = useState([]);

  const [codigoMuncipio, setCodigoMunicipio] = useState(0);
  const [nome, setNome] = useState('');
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const trazerListaBairro = async () => {
      try {
        const response = await conectarBackend.get('/bairro');
        setBairro(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados do servidor:', error);
      }
    };

    trazerListaBairro();
  }, []);

  const cadastrarBairro = async () => {
    try {
      const novoBairro = {
        codigoMuncipio: codigoMuncipio,
        nome: nome,
        status: status
      };

      const response = await conectarBackend.post('/bairro', novoBairro);
      setBairro([...bairro, response.data]);
      setNome('');
      setCodigoMunicipio('');
      setStatus(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ul>
        {bairro.map((ba) => (
          <li key={ba.codigoBairro}>
            Nome: {ba.nome}  Codigo Municipio: {ba.codigoMuncipio} Status: {ba.status}
          </li>
        ))}
      </ul>
      <div>
        <label>
          Nome Bairro:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <label>
          Codigo Municipio:
          <input type="number" value={codigoMuncipio} onChange={(e) => setCodigoMunicipio(e.target.value)} />
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
          <button type="submit" onClick={cadastrarBairro}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default Bairro;
