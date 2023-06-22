import { Request, Response } from "express-serve-static-core";
import { ControladorGeral } from "../ControladorGeral";

export class ControladorUf extends ControladorGeral{

    public async atualizarDado(requisicao: Request, resposta: Response ) {
        return resposta.status(200).json();
    }
    public async removerDado(requisicao: Request, resposta: Response ) {
        return resposta.status(200).json();
    }

    public async adionarDado(requisicao: Request, resposta: Response) {
        return resposta.status(200).json();
    }

    public async listarDado(requisicao: Request, resposta: Response ) {
        return resposta.status(200).json();
    }
}