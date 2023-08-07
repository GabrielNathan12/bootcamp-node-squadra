import { Request, Response, Router } from "express";
import { ControladorBairro } from "../controladores/controladorBairro/ControladorBairro";
import { IRepositorios } from "../Irepositorios/Irepositorios";
import { ufRepositorio } from "../repositorios/ufRepositorio";
import { bairroRepositorio } from "../repositorios/bairroRepositorio";
import { enderecoRepositorio } from "../repositorios/enderecosRepositorio";
import { municipioRepositorio } from "../repositorios/municipioRepositorio";
import { pessoaRepositorio } from "../repositorios/pessoaRepositorio";
import { eAutenticado } from "../middlewares/Autenticado";

const repositorios: IRepositorios = {
    ufRepositorio,
    bairroRepositorio,
    municipioRepositorio,
    enderecoRepositorio,
    pessoaRepositorio,

};
const rotaBairro = Router();
const ControladorGeral = new ControladorBairro(repositorios);

rotaBairro.get('/bairro',(requisicao: Request, resposta: Response)=> ControladorGeral.listarBairro(requisicao, resposta));
rotaBairro.post('/bairro',(requisicao: Request, resposta: Response)=> ControladorGeral.criarBairro(requisicao, resposta));
rotaBairro.put('/bairro',eAutenticado,(requisicao: Request, resposta: Response)=> ControladorGeral.atualizarBairro(requisicao, resposta));
rotaBairro.delete('/bairro/:codigoBairro',eAutenticado,(requisicao: Request, resposta: Response)=> ControladorGeral.deletarBairro(requisicao, resposta));

export default rotaBairro;
