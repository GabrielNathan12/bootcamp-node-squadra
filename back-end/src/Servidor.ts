import express from 'express';
import {AppDataSource} from './data-source';


AppDataSource.initialize().then(()=>{
    const servidor = express();
    servidor.use(express.json());

    console.log("Conexão realizada com a Oracle")
    return servidor.listen(process.env.DBPORTASER);
});

