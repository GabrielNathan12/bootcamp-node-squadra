import { ufRepositorio } from "../../../banco_de_dados/repositorios/ufRepositorio";
import { IUF } from "../../vo/IUF";

export class ServicosUF{

    public async criarNovoUf(uf: IUF){
        
        const repositorios = ufRepositorio;
        repositorios.save(uf);

        return await repositorios.find({});
    }

    public async nomeUfExiste(nome:string){
        const uf = await ufRepositorio.findOne({where:{nome:nome}});

        return uf;
    }
    public async siglaUfExiste(sigla: string){
        const uf = await ufRepositorio.findOne({where:{sigla:sigla}});

        return uf;
    }

    public async listarTodosUfs(){
        const repositorios = ufRepositorio;
        const lista = await repositorios.find({});
        return lista;
    }

    public async listarUfPorParametros(parametros: any){
        const repositorios = ufRepositorio;
        
        let condicoes: any = {};

        if(parametros.codigoUF){
            condicoes.codigoUF = parametros.codigoUF;
        }
        if(parametros.nome){
            condicoes.nome = parametros.nome;
        }
        if(parametros.sigla){
            condicoes.sigla = parametros.sigla;
        }
        if(parametros.status){
            condicoes.status = parametros.status;
        }

        const resultado = await repositorios.find({where: condicoes});
        
        return resultado;

    }
}