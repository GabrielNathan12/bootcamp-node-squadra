import { Router } from "express";
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

rotaMunicipio.get('/municipio', ControladorGeral.listarDado);
rotaMunicipio.post('/municipio', ControladorGeral.adionarDado);
rotaMunicipio.put('/municipio/:idmunicipio', ControladorGeral.atualizarDado);
rotaMunicipio.delete('/municipio/:idmunicipio', ControladorGeral.removerDado);

export default rotaMunicipio;
