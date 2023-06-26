import { Request, Response } from "express-serve-static-core";
import { IRepositorios } from "../Irepositorios/Irepositorios";
import { ufRepositorio } from "../repositorios/ufRepositorio";
import { municipioRepositorio } from "../repositorios/municipioRepositorio";
import { bairroRepositorio } from "../repositorios/bairroRepositorio";
import { enderecoRepositorio } from "../repositorios/enderecosRepositorio";
import { pessoaRepositorio } from "../repositorios/pessoaRepositorio";
export abstract class ControladorGeral{
    

    public repositorios: IRepositorios = {
        ufRepositorio: ufRepositorio,
        municipioRepositorio: municipioRepositorio,
        bairroRepositorio: bairroRepositorio,
        enderecoRepositorio: enderecoRepositorio,
        pessoaReposotorio: pessoaRepositorio
    }
  
    public abstract adionarDado(requisicao: Request, resposta: Response ) : Promise<Response>;
    public abstract removerDado(requisicao: Request, resposta: Response ) : Promise<Response>;
    public abstract atualizarDado(requisicao: Request, resposta: Response): Promise<Response>;
    public abstract listarDado(requisicao: Request, resposta: Response ) : Promise<Response>;
    

    protected vericarStatus(Status: number): Boolean{
        if(Status > 1 || Status < 0){
            return false;
        }
        return true;
    }
}