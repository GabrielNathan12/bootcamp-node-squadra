import { Router } from "express";
import { ControladorUf } from "../controladores/controladorUf/controladorUf";

const rotaUf = Router();
const ControladorGeral = new ControladorUf();

rotaUf.get('/uf', ControladorGeral.listarDado);
rotaUf.post('/uf', ControladorGeral.adionarDado);
rotaUf.put('/uf/:iduf', ControladorGeral.atualizarDado);
rotaUf.delete('/uf/:iduf', ControladorGeral.removerDado);

export default rotaUf;