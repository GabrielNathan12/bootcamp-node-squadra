import { Router } from "express";
import { ControladorBairro } from "../controladores/controladorBairro/controladorBairro";

const rotaBairro = Router();
const ControladorGeral = new ControladorBairro();

rotaBairro.get('/bairro', ControladorGeral.listarDado)
export default rotaBairro;
