import { Router } from "express";
import { ControladorEndereco } from "../controladores/controladorEndereco/controladorEndereco";

const rotaEndereco = Router();
const ControladorGeral = new ControladorEndereco();

rotaEndereco.get('/endereco', ControladorGeral.listarDado);
rotaEndereco.post('/endereco/:idendereco', ControladorGeral.adionarDado);
rotaEndereco.put('/endereco/:idendereco', ControladorGeral.atualizarDado);
rotaEndereco.delete('/endereco/:idendereco', ControladorGeral.removerDado);


export default rotaEndereco;