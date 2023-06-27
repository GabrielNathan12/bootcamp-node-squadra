import { Router } from "express";
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

rotaBairro.get('/bairro', ControladorGeral.listarDado);
rotaBairro.post('/bairro', ControladorGeral.adionarDado);
rotaBairro.put('/bairro/:idbairro', ControladorGeral.atualizarDado);
rotaBairro.delete('/bairro/:idbairro', ControladorGeral.removerDado);

export default rotaBairro;
