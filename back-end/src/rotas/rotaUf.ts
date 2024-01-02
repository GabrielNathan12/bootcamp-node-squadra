import { Router, Request, Response } from "express";
import { ControladorUF } from "../sistema/controlador/controladorUf/controladorUf";

const rotaUf = Router();

const ufControlador = new ControladorUF();

rotaUf.get('/uf', (requisicao: Request, resposta: Response) => {
    ufControlador.listarUf(requisicao, resposta);
});

rotaUf.post('/uf',(requisicao: Request, resposta: Response) => {
    ufControlador.criarUf(requisicao, resposta);
});

rotaUf.put('/uf',(requisicao: Request, resposta: Response) => {
    ufControlador.atualizarUf(requisicao, resposta);
});

rotaUf.delete('/uf/:codigoUf',(requisicao: Request, resposta: Response) => {
    ufControlador.deletarUf(requisicao, resposta);
});

export default rotaUf;