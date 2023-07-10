import { Router, Request, Response } from "express";
import { ControladorPessoa } from "../controladores/controladorPessoa/ControladorPessoa";
import { IRepositorios } from "../Irepositorios/Irepositorios";
import { ufRepositorio } from "../repositorios/ufRepositorio";
import { bairroRepositorio } from "../repositorios/bairroRepositorio";
import { municipioRepositorio } from "../repositorios/municipioRepositorio";
import { enderecoRepositorio } from "../repositorios/enderecosRepositorio";
import { pessoaRepositorio } from "../repositorios/pessoaRepositorio";
import { eAutenticado } from "../middlewares/Autenticado";

const repositorios: IRepositorios = {
    ufRepositorio,
    bairroRepositorio,
    municipioRepositorio,
    enderecoRepositorio,
    pessoaRepositorio,

};
const rotaPessoa = Router();
const ControladorGeral = new ControladorPessoa(repositorios);

rotaPessoa.get('/pessoa',(requisicao: Request, resposta: Response)=>  ControladorGeral.listarPessoa(requisicao, resposta));
rotaPessoa.post('/pessoa', eAutenticado,(requisicao: Request, resposta: Response)=> ControladorGeral.criarPessoa(requisicao, resposta));
rotaPessoa.put('/pessoa',eAutenticado,(requisicao: Request, resposta: Response)=> ControladorGeral.atualizarPessoa(requisicao, resposta));
rotaPessoa.delete('/pessoa/:codigoPessoa',eAutenticado,(requisicao: Request, resposta: Response)=> ControladorGeral.deletarPessoa(requisicao, resposta));

export default rotaPessoa;
