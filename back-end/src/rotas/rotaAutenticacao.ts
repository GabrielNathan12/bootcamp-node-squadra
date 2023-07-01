import { Router, Request, Response } from "express";
import { IRepositorios } from "../Irepositorios/Irepositorios";
import { ufRepositorio } from "../repositorios/ufRepositorio";
import { bairroRepositorio } from "../repositorios/bairroRepositorio";
import { municipioRepositorio } from "../repositorios/municipioRepositorio";
import { enderecoRepositorio } from "../repositorios/enderecosRepositorio";
import { pessoaRepositorio } from "../repositorios/pessoaRepositorio";
import { ControladorAutenticacao } from "../controladores/controladorPessoa/ControladorAutenticacao";

const repositorios: IRepositorios = {
    ufRepositorio,
    bairroRepositorio,
    municipioRepositorio,
    enderecoRepositorio,
    pessoaRepositorio,

};
const rotaAutenticacao = Router();
const ControladorGeral = new ControladorAutenticacao(repositorios);

rotaAutenticacao.post('/',(requisicao: Request, resposta: Response)=>  ControladorGeral.criarSecao(requisicao, resposta));

export default rotaAutenticacao;
