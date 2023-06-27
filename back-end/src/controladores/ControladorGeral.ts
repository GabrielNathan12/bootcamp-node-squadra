import { Request, Response } from "express-serve-static-core";
export abstract class ControladorGeral  {
 
    constructor(){
        
    }
    public abstract adionarDado(requisicao: Request, resposta: Response ) : Promise<Response>;
    public abstract removerDado(requisicao: Request, resposta: Response ) : Promise<Response>;
    public abstract atualizarDado(requisicao: Request, resposta: Response): Promise<Response>;
    public abstract listarDado(requisicao: Request, resposta: Response ) : Promise<Response>;
    

    protected vericarStatus(Status: number): Boolean{
        if(Status == 1 || Status == 0){
            return true;
        }
        return false;
    }
}