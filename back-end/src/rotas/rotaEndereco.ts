import { Request, Response, Router } from "express";
import { ControladorEndereco } from "../controladores/controladorEndereco/controladorEndereco";
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
const rotaEndereco = Router();
const ControladorGeral = new ControladorEndereco(repositorios);

rotaEndereco.get('/endereco',(requisicao: Request, resposta: Response)=> ControladorGeral.listarDado(requisicao, resposta));
rotaEndereco.post('/endereco',(requisicao: Request, resposta: Response)=> ControladorGeral.adionarDado(requisicao, resposta));
rotaEndereco.put('/endereco',(requisicao: Request, resposta: Response)=> ControladorGeral.atualizarDado(requisicao, resposta));
rotaEndereco.delete('/endereco/:idendereco',(requisicao: Request, resposta: Response)=> ControladorGeral.removerDado(requisicao, resposta));


export default rotaEndereco;