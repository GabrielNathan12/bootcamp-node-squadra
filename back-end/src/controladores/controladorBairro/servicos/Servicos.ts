import { IRepositorios } from "../../../Irepositorios/Irepositorios";
import { Bairro } from "../../../entidades/Bairro";
import { ErrosDaAplicacao } from "../../../errosAplicacao/ErrosDaAplicacao";

interface IBairro{
    codigoBairro?:number,
    codigoMunicipio:number,
    nome: string,
    status: number
}

export class Servicos{
    private repositorios: IRepositorios;

    constructor(repositorios: IRepositorios) {
        this.repositorios = repositorios;
    }

    protected async validarTodosOsCampus({codigoMunicipio, nome, status}: IBairro){
        const repositorioBairro = this.repositorios.bairroRepositorio;
        const repositorioMunicipio = this.repositorios.municipioRepositorio;
        
        if(!codigoMunicipio || isNaN(codigoMunicipio)){
          throw new ErrosDaAplicacao('Campo codigoMunicipio nao encontrado', 400);
        }
        if(!nome){
          throw new ErrosDaAplicacao('Campo nome nao encontrado', 400);
        }
        if(!status || isNaN(status) || !this.verificaStatusValido(Number(status))){
          throw new ErrosDaAplicacao(`Status do campo invalido: Motivo = ${status}`, 400);
        }
        const municipioExiste = await repositorioMunicipio.findOne({where: { codigoMunicipio: codigoMunicipio }});
  
        if (!municipioExiste) {
          throw new ErrosDaAplicacao('codigoMunicipio nao encontrado no Banco de Dados', 400);
        }
        
        const bairroExiste = await repositorioBairro.createQueryBuilder("Bairro").where("Bairro.nome = :nome", {nome: nome})
                                                    .andWhere("Bairro.codigoMunicipio = :codigoMunicipio"
                                                    ,{codigoMunicipio:codigoMunicipio}).getOne();
  
        if (bairroExiste) {
          throw new ErrosDaAplicacao('Bairro ja cadastrado nesse municipio', 400);
        }
      }

    protected getRepositorio(){
        return this.repositorios.bairroRepositorio;
    }

    protected getRepositorioMunicipio(){
        return this.repositorios.municipioRepositorio;
    }

    protected verificaStatusValido(status: number){
        return status === 1 || status === 2;
    }

    protected listarBairros(bairros: Bairro[]){

        return bairros.map((bairro) => ({
            codigoBairro: bairro.codigoBairro,
            codigoMunicipio: bairro.codigoMunicipio.codigoMunicipio,
            nome: bairro.nome,
            status: bairro.status
        }));
    }
    
}