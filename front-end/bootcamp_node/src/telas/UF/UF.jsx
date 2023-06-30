import  {  useState } from 'react';
import conectarBackend from '../../servidor/ConexaoServidor';
import '../estilos/ufEstilo.css';

const UF = () => {
  const [ufs, setUfs] = useState([]);
  const [codigoUF, setCodigoUf] = useState('');
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [status, setStatus] = useState(0);

  const trazerUf = async () => {
  
    try {
      const response = await conectarBackend.get('/uf');
      setUfs(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados do servidor:', error);
    }
  };


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
  const removerUf = async () =>{
    try{
      await conectarBackend.delete(`/uf/:${codigoUF}`);
      setUfs(ufs.filter((uf) => uf.codigoUF !== codigoUF));
      setCodigoUf('');
      trazerUf();
     
    }catch(error){
      console.log(error);
    }
  }
  const atualizarUf = async () => {
    try{
      const atualizarUf = {
        nome: nome,
        sigla: sigla,
        status: status
      }
      const resposta = await conectarBackend.put('/uf', atualizarUf);
      setUfs([...ufs], resposta.data)
      setNome('');
      setSigla('');
      setStatus(0);
     
    }catch(error){
        console.log(error);
      }
      trazerUf();
  }
  
  return (
    <div className='container-uf'>
      <ul className='container-uf-ul'>
        {ufs.map((uf) => (
          <li key={uf.codigoUF} className='uf-lista'>
            CodigoUF: {uf.codigoUF} Nome: {uf.nome} Sigla: {uf.sigla} Status: {uf.status}
          </li>
        ))}
      </ul>
      
      <div className='cadastro-uf'>
        <h2>Cadastro UF</h2>
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
          <input type="number"min={0} max={1} value={status} onChange={(e) => setStatus(Number(e.target.value))} />
        </label>
        </div>
        
        <div>
          <button type="submit" onClick={cadastrarUf}>
            Confirmar
          </button>
        </div>

        <div className='atualizar-uf'>
          <h2>Atualizar UF</h2>
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
            <input type="number"min={0} max={1} value={status} onChange={(e) => setStatus(Number(e.target.value))} />
        </label>
        </div>
          <div>
            <button type="submit" onClick={atualizarUf}>
              Confirmar
            </button>
          <div>
            <label>
              Remover UF
              <input type='number' value={codigoUF} onChange={(e) => setCodigoUf(e.target.value)}/>
              <button type='submit' onClick={removerUf}>Confirmar</button>
            </label>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default UF;
