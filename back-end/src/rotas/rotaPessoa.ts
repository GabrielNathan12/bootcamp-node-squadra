import { Router } from "express";
import { ControladorPessoa } from "../controladores/controladorPessoa/controladorPessoa";
import { IRepositorios } from "../Irepositorios/Irepositorios";
import { ufRepositorio } from "../repositorios/ufRepositorio";
import { bairroRepositorio } from "../repositorios/bairroRepositorio";
import { municipioRepositorio } from "../repositorios/municipioRepositorio";
import { enderecoRepositorio } from "../repositorios/enderecosRepositorio";
import { pessoaRepositorio } from "../repositorios/pessoaRepositorio";

const repositorios: IRepositorios = {
    ufRepositorio,
    bairroRepositorio,
    municipioRepositorio,
    enderecoRepositorio,
    pessoaRepositorio,

};
const rotaPessoa = Router();
const ControladorGeral = new ControladorPessoa(repositorios);

rotaPessoa.get('/pessoa', ControladorGeral.listarDado);
rotaPessoa.post('/pessoa', ControladorGeral.adionarDado);
rotaPessoa.put('/pessoa/:idpessoa', ControladorGeral.atualizarDado);
rotaPessoa.delete('/pessoa/:idpessoa', ControladorGeral.removerDado);

export default rotaPessoa;
