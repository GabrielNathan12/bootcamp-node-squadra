import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Home from './rotas/Home';

const App = () =>{
  
  return (
    <div className='App'>
      <Navbar/>
      <div className='container'>
        <Outlet/>
        <Home/>
       
      </div>
     
    </div>
  );
}

export default App;
