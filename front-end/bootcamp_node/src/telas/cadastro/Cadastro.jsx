import '../estilos/cadastroEstilo.css'

const Cadastro = () =>{
    return (
        <div className="conteiner-cadastro">
            <h1>Realize seu Cadastro</h1>

            <form className="form-cadastro">
                <label>Nome: </label>
                    <input type="text" placeholder="nome"/>
                <label>Sobrenome: </label>
                    <input type="text" name="text" placeholder="sobrenome"/>
                <label>Idade: </label>
                    <input type="number" placeholder="Idade" min={0} max={100}/>
                <label>Email: </label>
                    <input type="email" placeholder="email"/>
                <label>Senha: </label>
                    <input type="password" placeholder="senha"/>
                <button type="submit" className="botao-cadastro">
                    Entrar
                </button>
                <button type="reset">Resetar Campus</button>
            </form>
        </div>
    )
}

export default Cadastro;
