import { Router } from "express";
import { ControladorUf } from "../controladores/controladorUf/controladorUf";

const rotaUf = Router();
const ControladorGeral = new ControladorUf();

rotaUf.get('/uf', ControladorGeral.listarDado);
rotaUf.post('/uf/criar', ControladorGeral.adionarDado);
rotaUf.put('/uf/atualizar/:iduf', ControladorGeral.atualizarDado);
rotaUf.delete('/uf/deletar/:iduf', ControladorGeral.removerDado);

export default rotaUf;