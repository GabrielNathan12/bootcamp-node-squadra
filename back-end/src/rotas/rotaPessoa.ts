import { Router, Request, Response } from "express";
import { ControladorPessoa } from "../controladores/controladorPessoa/controladorPessoa";
import { IRepositorios } from "../Irepositorios/Irepositorios";
import { ufRepositorio } from "../repositorios/ufRepositorio";
import { bairroRepositorio } from "../repositorios/bairroRepositorio";
import { municipioRepositorio } from "../repositorios/municipioRepositorio";
import { enderecoRepositorio } from "../repositorios/enderecosRepositorio";
import { pessoaRepositorio } from "../repositorios/pessoaRepositorio";

const repositorios: IRepositorios = {
    ufRepositorio,
    bairroRepositorio,
    municipioRepositorio,
    enderecoRepositorio,
    pessoaRepositorio,

};
const rotaPessoa = Router();
const ControladorGeral = new ControladorPessoa(repositorios);

rotaPessoa.get('/pessoa',(requisicao: Request, resposta: Response)=>  ControladorGeral.listarDado(requisicao, resposta));
rotaPessoa.post('/pessoa',(requisicao: Request, resposta: Response)=> ControladorGeral.adionarDado(requisicao, resposta));
rotaPessoa.put('/pessoa/:idpessoa',(requisicao: Request, resposta: Response)=> ControladorGeral.atualizarDado(requisicao, resposta));
rotaPessoa.delete('/pessoa/:idpessoa',(requisicao: Request, resposta: Response)=> ControladorGeral.removerDado(requisicao, resposta));

export default rotaPessoa;
