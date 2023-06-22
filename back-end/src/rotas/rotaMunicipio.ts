import { Router } from "express";
import { ControladorMunicipio } from "../controladores/controladorMunicipio/controladorMunicipio";

const rotaMunicipio = Router();
const ControladorGeral = new ControladorMunicipio();

rotaMunicipio.get('/municipio', ControladorGeral.listarDado);

export default rotaMunicipio;
