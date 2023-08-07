import { useNavigate } from 'react-router-dom';
import '../estilos/Pessoa.css';
import { useState } from 'react';
import ConectarBackend from '../servidor/ConexaoServidor';

const Login = () => {
  const navegacao = useNavigate();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const iniciarSecao = async () => {
    if (!login || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novoLogin = { login, senha };
    
    try {
      await ConectarBackend.post('/autenticar', novoLogin);
      
      alert("Login realizado com sucesso");
      navegacao('/');
    }

    catch (error) {
      alert('Falha na autenticação. Verifique suas credenciais.');
    }

  };

  return (
    <div className="novo-pessoa">
      <h2>Login:</h2>
      <form onSubmit={iniciarSecao}>
        <div className="form-control">
          <label htmlFor="login">Seu email:</label>
          <input type="text" name="login" value={login} placeholder="Digite o seu email" onChange={(e) => setLogin(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="senha">Sua Senha:</label>
          <input type="password" name="senha" value={senha} placeholder="Digite sua senha" onChange={(e) => setSenha(e.target.value)} />
        </div>
        
        <button type="button" onClick={iniciarSecao}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
