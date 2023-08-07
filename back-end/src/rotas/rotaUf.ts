import { Router, Request, Response } from "express";
import { ControladorUF } from "../controladores/controladorUf/ControladorUf";
import { ufRepositorio } from "../repositorios/ufRepositorio";
import { bairroRepositorio } from "../repositorios/bairroRepositorio";
import { municipioRepositorio } from "../repositorios/municipioRepositorio";
import { enderecoRepositorio } from "../repositorios/enderecosRepositorio";
import { pessoaRepositorio } from "../repositorios/pessoaRepositorio";
import { IRepositorios } from "../Irepositorios/Irepositorios";
import { eAutenticado } from "../middlewares/Autenticado";

const rotaUf = Router();

const repositorios: IRepositorios = {
    ufRepositorio,
    bairroRepositorio,
    municipioRepositorio,
    enderecoRepositorio,
    pessoaRepositorio,

};

const ControladorGeral = new ControladorUF(repositorios);

rotaUf.get('/uf' ,(requisicao: Request, resposta: Response)=> ControladorGeral.litarUF(requisicao, resposta));
rotaUf.post('/uf',(requisicao: Request, resposta: Response)=> ControladorGeral.criarUf(requisicao, resposta));
rotaUf.put('/uf', (requisicao: Request, resposta: Response)=> ControladorGeral.atualizarUf(requisicao, resposta));
rotaUf.delete('/uf/:codigoUF',(requisicao: Request, resposta: Response)=> ControladorGeral.deletarUf(requisicao, resposta));

export default rotaUf;