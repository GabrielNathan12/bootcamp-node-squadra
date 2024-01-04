import { Not, QueryFailedError } from "typeorm";
import { municipioRepositorio } from "../../../banco_de_dados/repositorios/municipioRepositorio";
import { ufRepositorio } from "../../../banco_de_dados/repositorios/ufRepositorio";
import { IMunicipio } from "../../vo/IMunicipio";
import { IUF } from "../../vo/IUF";

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

    public async atualizarMunicipio(municipio: IMunicipio, codigoMunicipio: number, codigoUF: number){
       
        const repositorioMunicipio = municipioRepositorio;
        const repositorioUf = ufRepositorio;

        const municipioExiste = await repositorioMunicipio.findOne({where: {codigoMunicipio: codigoMunicipio}, relations: ['uf']});

        if(!municipioExiste){
            return null;
        }
        const ufExiste = await repositorioUf.findOne({where: {codigoUF: codigoUF}});

        if(!ufExiste){
            return null;
        }
        municipioExiste.nome = municipio.nome;
        municipioExiste.status = municipio.status;
        municipioExiste.uf = ufExiste;

        await repositorioMunicipio.save(municipioExiste);

        return await municipioRepositorio.find({});
       
    }

    public async procurarMunicipioPeloCodigoMunicipio(codigoMunicipio: number){
        const repositorio = municipioRepositorio;
        const resultado = await repositorio.findOne({where: {codigoMunicipio: codigoMunicipio}});
        return resultado;
    }

    public async existeDuplicatasMunicipio(nome: string, codigoUF: number){
        const repositorio = municipioRepositorio;

       const resultado = await repositorio.findOne({
        where: {nome: nome, uf: {codigoUF: codigoUF}}
       })

        return resultado;
        
    }

    public async existeDuplicatasMunicipioAtualizacao(nome: string, uf: IUF, codigoMunicipio: number){
       
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