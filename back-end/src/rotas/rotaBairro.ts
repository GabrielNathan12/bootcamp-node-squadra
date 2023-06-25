import { Router } from "express";
import { ControladorBairro } from "../controladores/controladorBairro/controladorBairro";

const rotaBairro = Router();
const ControladorGeral = new ControladorBairro();

rotaBairro.get('/bairro', ControladorGeral.listarDado);
rotaBairro.post('/bairro', ControladorGeral.adionarDado);
rotaBairro.put('/bairro/:idbairro', ControladorGeral.atualizarDado);
rotaBairro.delete('/bairro/:idbairro', ControladorGeral.removerDado);

export default rotaBairro;
