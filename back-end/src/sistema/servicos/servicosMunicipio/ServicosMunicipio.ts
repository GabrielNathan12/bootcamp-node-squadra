import { QueryFailedError } from "typeorm";
import { municipioRepositorio } from "../../../banco_de_dados/repositorios/municipioRepositorio";
import { ufRepositorio } from "../../../banco_de_dados/repositorios/ufRepositorio";
import { IMunicipio } from "../../vo/IMunicipio";

export class ServicosMunicipios{

    public async criarNovoMunicipio(municipio: IMunicipio){
        const repositorio = municipioRepositorio;
        const novoMunicipio = repositorio.create({uf: {codigoUF: municipio.codigoUF}, 
                                                nome: municipio.nome,
                                                status: municipio.status});

        await repositorio.save(novoMunicipio);

        return await repositorio.find({});
        
    }

    public async procurarUFPeloCodigoUF(codigoUF: number){
        const repositorio = ufRepositorio;
        const resultado = await repositorio.findOne({where: {codigoUF: codigoUF}});
        return resultado;
    }

    public async existeDuplicatasMunicipio(nome: string, codigoUF: number){
        const repositorio = municipioRepositorio;

       const resultado = await repositorio.findOne({
        where: {nome: nome, uf: {codigoUF: codigoUF}}
       })

        return resultado;
        
    }

    public async listarMunicipios(){
        const repositorio = municipioRepositorio;
        const lista = await repositorio.find({select :['codigoMunicipio', 'nome', 'status' , 'uf'], relations : ['uf']});
        return lista;
    }

    public async listarMunicipioPorParametros(parametros: any){
        const repositorio = municipioRepositorio;
        const lista = await repositorio.find({select :['codigoMunicipio', 'nome', 'status' , 'uf'], relations : ['uf']});
        return lista;
    }
}