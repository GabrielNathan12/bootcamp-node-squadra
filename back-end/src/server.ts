import Express, { Router, Request, Response } from "express";
import Servidores from './server/app';
import rotaBairro from "./rotas/rotaBairro/rotaBairro";
import rotaPessoa from "./rotas/rotaPessoa/rotaPessoa";
import rotaMunicipio from "./rotas/rotaMunicipio/rotaMunicipio";
import rotaUF from "./rotas/rotaUF/rotaUF";
const App = Express();
const rota = Router();

App.use(Express.json());

rota.get('/', (request: Request , response: Response) =>{
    response.json({Servidores});
} )

App.use(rotaBairro);
App.use(rotaMunicipio);
App.use(rotaPessoa);
App.use(rotaPessoa);

App.listen(3001 , () =>{
    console.log("Estamos online em localhost:3001");
});