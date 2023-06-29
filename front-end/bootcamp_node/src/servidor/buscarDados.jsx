import conectarBackend from "./conexaoServidos";

export default class Dados{
    getAll = () =>{
        conectarBackend.get('/uf');
    }
}