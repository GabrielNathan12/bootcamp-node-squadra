import { Router } from "express";
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

rotaEndereco.get('/endereco', ControladorGeral.listarDado);
rotaEndereco.post('/endereco', ControladorGeral.adionarDado);
rotaEndereco.put('/endereco/:idendereco', ControladorGeral.atualizarDado);
rotaEndereco.delete('/endereco/:idendereco', ControladorGeral.removerDado);


export default rotaEndereco;