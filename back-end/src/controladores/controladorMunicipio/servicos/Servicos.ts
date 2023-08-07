import { IRepositorios } from "../../../Irepositorios/Irepositorios";
import { Municipio } from "../../../entidades/Municipio";
import { ErrosDaAplicacao } from "../../../errosAplicacao/ErrosDaAplicacao";

interface IMunicipio{
    codigoMunicipio?:number,
    codigoUF:number,
    nome: string,
    status: number
}

export class Servicos{
    private repositorios: IRepositorios;

    constructor(repositorios: IRepositorios) {
        this.repositorios = repositorios;
    }

    protected getRepositorio(){
        return this.repositorios.municipioRepositorio;
    }

    protected getRepositorioUf(){
        return this.repositorios.ufRepositorio;
    }

    protected async validaTodosOsCampus({codigoUF, nome, status}: IMunicipio){
        const repositorioMunicipio = this.getRepositorio();
        const repositorioUF = this.getRepositorioUf();

        const ufExiste = await repositorioUF.findOne({where: {codigoUF: codigoUF}});

        if(!codigoUF || isNaN(codigoUF)){
            throw new ErrosDaAplicacao(`Campo codigoUF invalido, Motivo: ${codigoUF}`, 400);
        }
        if(!nome){
            throw new ErrosDaAplicacao('Campo nome nao encontrado',400);
        }
        if(!status || isNaN(status) || !this.verificaStatusValido(status)){
            throw new ErrosDaAplicacao(`Status do campo invalido: Motivo = ${status}`, 400);
        }

        const municipioExiste = await repositorioMunicipio.createQueryBuilder("Municipio")
                                                .where("Municipio.nome = :nome", { nome: nome })
                                                .andWhere("Municipio.codigoUF = :codigoUF", { codigoUF: codigoUF })
                                                .getOne();
                                                
        if(!ufExiste){
            throw new ErrosDaAplicacao('codigoUF nao encontrado no Banco de Dados', 400);
        }
        
        if(municipioExiste){
            throw new ErrosDaAplicacao('Municipio ja cadastrado nesse UF', 400);
        }
    }
    
    protected listarMunicipios(municipios: Municipio[]){

        return municipios.map((municipio) => ({
            codigoMunicipio: municipio.codigoMunicipio,
            codigoUF: municipio.codigoUF.codigoUF,
            nome: municipio.nome,
            status: municipio.status
        }));
    }

    protected verificaStatusValido(status: number){
        return status === 1 || status === 2;
    }
}