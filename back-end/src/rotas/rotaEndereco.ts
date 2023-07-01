import { Request, Response, Router } from "express";
import { ControladorEndereco } from "../controladores/controladorEndereco/ControladorEndereco";
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
const rotaEndereco = Router();
const ControladorGeral = new ControladorEndereco(repositorios);

rotaEndereco.get('/endereco',(requisicao: Request, resposta: Response)=> ControladorGeral.listarEndereco(requisicao, resposta));
rotaEndereco.post('/endereco',eAutenticado,(requisicao: Request, resposta: Response)=> ControladorGeral.criarEndereco(requisicao, resposta));
rotaEndereco.put('/endereco',eAutenticado,(requisicao: Request, resposta: Response)=> ControladorGeral.atualizarEndereco(requisicao, resposta));
rotaEndereco.delete('/endereco/:idendereco',eAutenticado,(requisicao: Request, resposta: Response)=> ControladorGeral.deletarEndereco(requisicao, resposta));


export default rotaEndereco;