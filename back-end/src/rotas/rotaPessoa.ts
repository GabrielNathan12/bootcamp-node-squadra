import { Router } from "express";
import { ControladorPessoa } from "../controladores/controladorPessoa/controladorPessoa";

const rotaPessoa = Router();
const ControladorGeral = new ControladorPessoa();

rotaPessoa.get('/municipio', ControladorGeral.listarDado);

export default rotaPessoa;
