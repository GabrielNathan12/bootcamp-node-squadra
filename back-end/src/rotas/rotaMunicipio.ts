import { Router } from "express";
import { ControladorMunicipio } from "../controladores/controladorMunicipio/controladorMunicipio";

const rotaMunicipio = Router();
const ControladorGeral = new ControladorMunicipio();

rotaMunicipio.get('/municipio', ControladorGeral.listarDado);
rotaMunicipio.post('/municipio', ControladorGeral.adionarDado);
rotaMunicipio.put('/municipio/:idmunicipio', ControladorGeral.atualizarDado);
rotaMunicipio.delete('/municipio/:idmunicipio', ControladorGeral.removerDado);

export default rotaMunicipio;
