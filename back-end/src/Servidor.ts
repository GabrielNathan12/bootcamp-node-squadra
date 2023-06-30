import express from 'express';
import {AppDataSource} from './data-source';
import rotaUf from './rotas/rotaUf';
import rotaMunicipio from './rotas/rotaMunicipio';
import rotaBairro from './rotas/rotaBairro';
import rotaEndereco from './rotas/rotaEndereco';
import rotaPessoa from './rotas/rotaPessoa';
import cors from 'cors';


AppDataSource.initialize().then(()=>{
    const servidor = express();
    servidor.use(express.json());
    servidor.use(cors());
    servidor.use(rotaUf);
    servidor.use(rotaMunicipio);
    servidor.use(rotaBairro);
    servidor.use(rotaEndereco);
    servidor.use(rotaPessoa);
    console.log("Conexão realizada com a Oracle")
    return servidor.listen(process.env.DBPORTASER);
});
