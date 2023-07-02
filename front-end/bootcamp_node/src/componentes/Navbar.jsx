import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
        <h2>
            <Link to={'/'}>Home</Link>
        </h2>
        <ul>
            <li>
                <Link to={'/uf'} className="new-btn">UFs</Link>
            </li>
            <li>
                <Link to={'/municipio'} className="new-btn">Municipio</Link>
            </li>
            <li>
                <Link to={'/bairro'} className="new-btn">Bairro</Link>
            </li>
            <li>
                <Link to={'/endereco'} className="new-btn">Endereço</Link>
            </li>
            <li>
                <Link to={'/pessoa'} className="new-btn">Pessoa</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar