
import Login from './telas/autenticacao/Login';
import Cadastro from './telas/cadastro/Cadastro';
import Municipio from './telas/municipio/Municipio';
import UF from './telas/UF/UF';

function App() {
  

  return (
    <div>

      <h1>Api: Cadastro de UF(Unidade Federativa)</h1>
      <nav><Login/></nav>
      <nav><Cadastro/></nav>

      <UF/>
      <Municipio/>
     </div>
  );
}

export default App;
