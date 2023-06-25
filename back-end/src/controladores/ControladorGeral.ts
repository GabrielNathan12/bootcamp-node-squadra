import { promises } from "dns";
import { Request, Response } from "express-serve-static-core";
export abstract class ControladorGeral{

    public abstract adionarDado(requisicao: Request, resposta: Response ) : Promise<Response>;
    public abstract removerDado(requisicao: Request, resposta: Response ) : Promise<Response>;
    public abstract atualizarDado(requisicao: Request, resposta: Response): Promise<Response>;
    public abstract listarDado(requisicao: Request, resposta: Response ) : Promise<Response>;
    

    //Verifica sen o Status e valido, aceita 1 ou 0
    // 1 para ativado e 0 para desativado
    protected vericarStatus(Status: number): Boolean{
        if(Status > 1 || Status < 0){
            return false;
        }
        return true;
    }
}