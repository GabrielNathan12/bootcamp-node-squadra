import { Router } from "express";
import { ControladorPessoa } from "../controladores/controladorPessoa/controladorPessoa";

const rotaPessoa = Router();
const ControladorGeral = new ControladorPessoa();

rotaPessoa.get('/pessoa', ControladorGeral.listarDado);
rotaPessoa.post('/pessoa', ControladorGeral.adionarDado);
rotaPessoa.put('/pessoa/:idpessoa', ControladorGeral.atualizarDado);
rotaPessoa.delete('/pessoa/:idpessoa', ControladorGeral.removerDado);

export default rotaPessoa;
