import { ufRepositorio } from "../../../banco_de_dados/repositorios/ufRepositorio";
import { IUF } from "../../vo/IUF";

export class ServicosUF{

    public async criarNovoUf(uf: IUF){
        
        const repositorios = ufRepositorio;
        repositorios.save(uf);

        return await this.listarUf();
    }
    
    public async nomeUfExiste(nome:string){
        const uf = await ufRepositorio.findOne({where:{nome:nome}});

        return uf;
    }
    public async siglaUfExiste(sigla: string){
        const uf = await ufRepositorio.findOne({where:{sigla:sigla}});

        return uf;
    }

    public async listarUf(){
        const repositorios = ufRepositorio;
        repositorios.find();
        return repositorios;
    }
}