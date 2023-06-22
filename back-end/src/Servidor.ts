import express from 'express';
import {AppDataSource} from './data-source';
import rotaUf from './rotas/rotaUf';


AppDataSource.initialize().then(()=>{
    const servidor = express();
    servidor.use(express.json());
    servidor.use(rotaUf);
    console.log("Conexão realizada com a Oracle")
    return servidor.listen(process.env.DBPORTASER);
});

