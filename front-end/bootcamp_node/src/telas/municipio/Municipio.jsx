import { useEffect, useState } from 'react';
import conectarBackend from '../../servidor/ConexaoServidor';
import '../estilos/municipioEstilo.css'

const Municipio = () => {
    const [municipios, setMunicipios] = useState([]);
    useEffect (() => {
        const trazerListaMunicipio = async () => {
        try{
            const resposta = await conectarBackend.get('/municipio');
            setMunicipios(resposta.data);
        }catch(error){
            console.error('Erro ao obter os dados do servidor', error);
        }
        };
        trazerListaMunicipio();
    } , []);

    return (
        <div className='container-municipio'> 
        <ul>
            {municipios.map((municipio) => (
                <li key={municipio.codigoMunicipio} className='lista-municipio'>Nome: {municipio.nome} Status: {municipio.status}</li>
            ))}
        </ul>
    </div>

       
    )
}
export default Municipio;