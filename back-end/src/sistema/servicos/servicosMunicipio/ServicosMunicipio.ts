import { municipioRepositorio } from "../../../banco_de_dados/repositorios/municipioRepositorio";
import { ufRepositorio } from "../../../banco_de_dados/repositorios/ufRepositorio";
import { IMunicipio } from "../../vo/IMunicipio";

export class ServicosMunicipios{

    public async criarNovoMunicipio(municipio: IMunicipio){
        const repositorio = municipioRepositorio;
        repositorio.save(municipio);
        return await repositorio.find({});
    }

    public async procurarUFPeloCodigoUF(codigoUF: number){
        const repositorio = ufRepositorio;
        const resultado = await repositorio.findOne({where: {codigoUF: codigoUF}});
        return resultado;
    }

    public async existeDuplicatasMunicipio(nome: string, uf: any){
        const repositorio = municipioRepositorio;

        const resultado = await repositorio.findOne({where: {nome: nome, uf:uf}});
        return resultado;
    } 
}