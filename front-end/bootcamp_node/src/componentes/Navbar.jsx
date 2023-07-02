import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
        <h2>
           <a href="/">Home</a>
        </h2>
        <ul>
            <li>
            <a href="/uf" className="new-btn">UFs</a>
            </li>
            <li>
                <a href="/municipio" className="new-btn">Municipio</a>
            </li>
            <li>
                <a href="/bairro" className="new-btn">Bairro</a>
            </li>
            <li>
                <a href="/endereco" className="new-btn">Endereço</a>
            </li>
            <li>
                <a href="/pessoa" className="new-btn">Pessoa</a>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar