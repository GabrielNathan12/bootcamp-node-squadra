import { useNavigate } from 'react-router-dom';
import '../estilos/Pessoa.css';
import { useState } from 'react';
import ConectarBackend from '../servidor/ConexaoServidor';

const Pessoa = () => {
  const navegacao = useNavigate();
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [idade, setIdade] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [status, setStatus] = useState('');

  const criarPessoa = async () => {
   if(!nome || !sobrenome || !idade || !login || !senha || !status){
    alert("Por favor preecha todos os campus");
   }

   const iStatus = parseInt(status);

   const novaPessoa = {nome, sobrenome, idade, login, senha,iStatus};

   try{
    await ConectarBackend.post('/pessoa', novaPessoa);
    alert("Pessoa incluida com sucesso")
    navegacao('/');

    }
    catch(error){
      alert(error);
   }
  };

  return (
    <div className="novo-pessoa">
      <h2>Inserir nova Pessoa:</h2>
      <form>
        <div className="form-control">
          <label htmlFor="nome">Nome:</label>
          <input type="text" name="nome" value={nome} placeholder="Digite o nome" onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="sobrenome">Sobrenome:</label>
          <input type="text" name="sobrenome" value={sobrenome} placeholder="Digite o sobrenome" onChange={(e) => setSobrenome(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="idade">Idade:</label>
          <input type="number" name="idade" value={idade} placeholder="Digite a idade" onChange={(e) => setIdade(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="login">Login:</label>
          <input type="text" name="login" value={login} placeholder="Digite o login" onChange={(e) => setLogin(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="senha">Senha:</label>
          <input type="password" name="senha" value={senha} placeholder="Digite a senha" onChange={(e) => setSenha(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="status">Status:</label>
          <input type="text" name="status" value={status} placeholder="Digite o status" onChange={(e) => setStatus(e.target.value)} />
        </div>
        <button type="submit" onClick={criarPessoa}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Pessoa;
