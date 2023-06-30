import { Router, Request, Response } from "express";
import { ControladorUf } from "../controladores/controladorUf/controladorUf";
import { ufRepositorio } from "../repositorios/ufRepositorio";
import { bairroRepositorio } from "../repositorios/bairroRepositorio";
import { municipioRepositorio } from "../repositorios/municipioRepositorio";
import { enderecoRepositorio } from "../repositorios/enderecosRepositorio";
import { pessoaRepositorio } from "../repositorios/pessoaRepositorio";
import { IRepositorios } from "../Irepositorios/Irepositorios";

const rotaUf = Router();

const repositorios: IRepositorios = {
    ufRepositorio,
    bairroRepositorio,
    municipioRepositorio,
    enderecoRepositorio,
    pessoaRepositorio,

};

const ControladorGeral = new ControladorUf(repositorios);

rotaUf.get('/uf',async (requisicao: Request, resposta: Response)=> ControladorGeral.listarDado(requisicao, resposta));
rotaUf.get('/uf/:nome', async(requisicao: Request, resposta: Response) => ControladorGeral.listarDadosPeloNome(requisicao, resposta));
rotaUf.post('/uf',async(requisicao: Request, resposta: Response)=> ControladorGeral.adionarDado(requisicao, resposta));
rotaUf.put('/uf',async(requisicao: Request, resposta: Response)=> ControladorGeral.atualizarDado(requisicao, resposta));
rotaUf.delete('/uf/:iduf',async(requisicao: Request, resposta: Response)=> ControladorGeral.removerDado(requisicao, resposta));

export default rotaUf;