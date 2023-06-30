import  '../estilos/loginEstilo.css'
const Login = () =>{
    return (
        <div className="conteiner-login">
            <h1>Realize seu Login</h1>

            <form className='form-login'>
                <label>Nome: </label>
                    <input type="email" name="email" placeholder="email"/>
                <label>Senha: </label>
                    <input type="password" name="senha" placeholder="senha"/>
                <button type="submit" className='botao-login'>
                    Entrar
                </button>
            </form>
        </div>
    )
}

export default Login;
