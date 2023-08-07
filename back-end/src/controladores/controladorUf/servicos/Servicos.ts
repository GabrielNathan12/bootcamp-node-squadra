import { IRepositorios } from "../../../Irepositorios/Irepositorios";
import { ErrosDaAplicacao } from "../../../errosAplicacao/ErrosDaAplicacao";

interface IUF{
    codigoUF?: number,
    nome: string,
    sigla: string,
    status: number
}

export class Servicos{
    private repositorios: IRepositorios;

    constructor(repositorios: IRepositorios){
        this.repositorios = repositorios;
    }

    protected obterRepositorioUF(){
        return this.repositorios.ufRepositorio;
    }

    protected async validarTodosOsCampus({nome, sigla, status}: IUF){
        const repositorioUF =  this.obterRepositorioUF();

        if(!nome){
            throw new ErrosDaAplicacao('Campo nome nao encontrado', 400);
        }
        if(!sigla){
           throw new ErrosDaAplicacao('Campo sigla nao encontrado', 400);
        }
        if(!status || isNaN(status) || !this.verificaStatusValido(Number(status))){
           throw new ErrosDaAplicacao(`Status do campo invalido: Motivo = ${status}`, 400);
        }
        if(!this.verificaSiglaValida(sigla)){
            throw new ErrosDaAplicacao('Sigla invalida',  400);
        }

        const ufExiste = await repositorioUF.findOne({where: {nome: nome}});
        const siglaExiste = await repositorioUF.findOne({where: {sigla: sigla}});

        if(ufExiste){
            throw new ErrosDaAplicacao('Uf ja cadastrado no Banco de Dados',  400);
        }
        if(siglaExiste){
            throw new ErrosDaAplicacao('Sigla ja cadastarda no Banco de Dados' , 400);
        }
    }
    
    protected verificaSiglaValida(sigla: String){
        if(sigla.length === 2){
            return true;
        }
        return false;
    }

    protected verificaStatusValido(status: number){
        return status === 1 || status === 2;
    }

    protected async listarUfs(){
        const repositorioUF = this.repositorios.ufRepositorio;

        return await repositorioUF.find({}); 
    }
}