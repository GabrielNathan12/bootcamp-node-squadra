import { Router } from "express";
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

rotaUf.get('/uf', ControladorGeral.listarDado);
rotaUf.post('/uf', ControladorGeral.adionarDado);
rotaUf.put('/uf/:iduf', ControladorGeral.atualizarDado);
rotaUf.delete('/uf/:iduf', ControladorGeral.removerDado);

export default rotaUf;