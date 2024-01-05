import { Router, Request, Response } from "express";
import { ControladorPessoa } from "../sistema/controlador/controladorPessoa/controladorPessoa";

const rotaPessoa = Router();

const controladorPessoa = new ControladorPessoa();

rotaPessoa.get('/pessoa', (requisicao: Request, resposta: Response) => {
    controladorPessoa.listarPessoa(requisicao, resposta);
});

rotaPessoa.post('/pessoa', (requisicao: Request, resposta: Response) =>{
    controladorPessoa.criarNovaPessoa(requisicao, resposta);
});

rotaPessoa.put('/pessoa', (requisicao: Request, resposta: Response) =>{
    controladorPessoa.atualizarPessoa(requisicao, resposta);
});

rotaPessoa.delete('/pessoa/:codigoPessoa', (requisicao: Request, resposta: Response) =>{
    controladorPessoa.deletarPessoa(requisicao, resposta);
});

export default rotaPessoa;