import { Router } from "express";
import { ControladorEndereco } from "../controladores/controladorEndereco/controladorEndereco";

const rotaEndereco = Router();
const ControladorGeral = new ControladorEndereco();

rotaEndereco.get('/endereco', ControladorGeral.listarDado);
export default rotaEndereco;