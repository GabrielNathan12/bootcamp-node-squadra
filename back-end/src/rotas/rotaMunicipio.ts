import { Request, Response, Router } from "express";
import { ControladorMunicipio } from "../controladores/controladorMunicipio/controladorMunicipio";
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
const rotaMunicipio = Router();
const ControladorGeral = new ControladorMunicipio(repositorios);

rotaMunicipio.get('/municipio',(requisicao: Request, resposta: Response)=> ControladorGeral.listarDado(requisicao, resposta));
rotaMunicipio.post('/municipio',(requisicao: Request, resposta: Response)=> ControladorGeral.adionarDado(requisicao, resposta));
rotaMunicipio.put('/municipio',(requisicao: Request, resposta: Response)=> ControladorGeral.atualizarDado(requisicao, resposta));
rotaMunicipio.delete('/municipio/:idmunicipio',(requisicao: Request, resposta: Response)=> ControladorGeral.removerDado(requisicao, resposta));

export default rotaMunicipio;
