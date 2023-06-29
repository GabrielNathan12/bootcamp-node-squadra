import { useEffect, useState } from 'react'

import conectarBackend from './servidor/conexaoServidos'
import './App.css'

function App() {
  const [uf, setUf] = useState([]);

  const colocarFrontEnd = () =>{
    conectarBackend.get('/uf').then((resultado) => {
      setUf(resultado.data)
    })
  }
  useEffect(() => {
    colocarFrontEnd
  })
  return (
    <>

      <div>
        colocarFrontEnd
      </div>
      
    </>
  )
}

export default App
