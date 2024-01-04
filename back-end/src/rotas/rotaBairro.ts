import { Request, Response, Router } from "express";
import { ControladorBairro } from "../sistema/controlador/controladorBairro/controladorBairro";

const rotaBairro = Router();

const controladorBairro = new ControladorBairro();

rotaBairro.get('/bairro', (requisicao: Request, resposta: Response) => {
    controladorBairro.listarBairros(requisicao, resposta);
});

rotaBairro.post('/bairro', (requisicao: Request, resposta: Response) => {
    controladorBairro.criarBairro(requisicao, resposta);
});

rotaBairro.put('/bairro', (requisicao: Request, resposta: Response) => {
    controladorBairro.atualizarBairro(requisicao, resposta);
});

rotaBairro.delete('/bairro/:codigoBairro', (requisicao: Request, resposta: Response) =>{
    controladorBairro.deletarBairro(requisicao, resposta);
});

export default rotaBairro;