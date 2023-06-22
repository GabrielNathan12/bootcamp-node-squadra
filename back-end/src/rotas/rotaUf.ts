import { Router } from "express";
import { ControladorUf } from "../controladores/controladorUf/controladorUf";

const rotaUf = Router();
const ControladorGeral = new ControladorUf();

rotaUf.get('/uf', ControladorGeral.listarDado);

export default rotaUf;