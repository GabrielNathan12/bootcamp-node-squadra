import { Request, Response, Router } from "express";
import { ControladorBairro } from "../controladores/controladorBairro/controladorBairro";
import { IRepositorios } from "../Irepositorios/Irepositorios";
import { ufRepositorio } from "../repositorios/ufRepositorio";
import { bairroRepositorio } from "../repositorios/bairroRepositorio";
import { enderecoRepositorio } from "../repositorios/enderecosRepositorio";
import { municipioRepositorio } from "../repositorios/municipioRepositorio";
import { pessoaRepositorio } from "../repositorios/pessoaRepositorio";

const repositorios: IRepositorios = {
    ufRepositorio,
    bairroRepositorio,
    municipioRepositorio,
    enderecoRepositorio,
    pessoaRepositorio,

};
const rotaBairro = Router();
const ControladorGeral = new ControladorBairro(repositorios);

rotaBairro.get('/bairro',(requisicao: Request, resposta: Response)=> ControladorGeral.listarDado(requisicao, resposta));
rotaBairro.post('/bairro',(requisicao: Request, resposta: Response)=> ControladorGeral.adionarDado(requisicao, resposta));
rotaBairro.put('/bairro/:idbairro',(requisicao: Request, resposta: Response)=> ControladorGeral.atualizarDado(requisicao, resposta));
rotaBairro.delete('/bairro/:idbairro',(requisicao: Request, resposta: Response)=> ControladorGeral.removerDado(requisicao, resposta));

export default rotaBairro;
