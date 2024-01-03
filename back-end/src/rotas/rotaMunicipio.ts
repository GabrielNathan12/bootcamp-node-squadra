import { Router, Request, Response } from "express";
import { ControladorMunicipio } from "../sistema/controlador/controladorMunicipio/controladorMunicipio";

const rotaMunicipio = Router();

const municipioControlador = new ControladorMunicipio();

rotaMunicipio.get('/municipio', (requisicao: Request, resposta: Response) => {
    municipioControlador.listarMunicipio(requisicao, resposta);
});

rotaMunicipio.post('/municipio',(requisicao: Request, resposta: Response) => {
    municipioControlador.criarMunicipio(requisicao, resposta);
});

rotaMunicipio.put('/municipio',(requisicao: Request, resposta: Response) => {
    municipioControlador.atualizarMunicipio(requisicao, resposta);
});

rotaMunicipio.delete('/municipio/:codigoMunicipio',(requisicao: Request, resposta: Response) => {
    municipioControlador.deletarMunicipio(requisicao, resposta);
});

export default rotaMunicipio;