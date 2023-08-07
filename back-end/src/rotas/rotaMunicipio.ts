import { Request, Response, Router } from "express";
import { ControladorMunicipio } from "../controladores/controladorMunicipio/ControladorMunicipio";
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
const rotaMunicipio = Router();
const ControladorGeral = new ControladorMunicipio(repositorios);

rotaMunicipio.get('/municipio',(requisicao: Request, resposta: Response)=> ControladorGeral.listarMunicipio(requisicao, resposta));
rotaMunicipio.post('/municipio',eAutenticado,(requisicao: Request, resposta: Response)=> ControladorGeral.criarMunicipio(requisicao, resposta));
rotaMunicipio.put('/municipio',eAutenticado,(requisicao: Request, resposta: Response)=> ControladorGeral.atualizarMunicipio(requisicao, resposta));
rotaMunicipio.delete('/municipio/:codigoMunicipio',eAutenticado,(requisicao: Request, resposta: Response)=> ControladorGeral.deletarMunicipio(requisicao, resposta));

export default rotaMunicipio;
