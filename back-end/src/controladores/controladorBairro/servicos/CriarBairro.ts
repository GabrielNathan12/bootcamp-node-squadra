import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";
import { ErrosDaAplicacao } from "../../../errosAplicacao/ErrosDaAplicacao";
import { ListarBairro } from "./ListarBairro";

interface ICriarBairro {
  codigoMunicipio: number;
  nome: string;
  status: number;
}

export class CriarBairro {
    private repositorios: IRepositorios;

    constructor(repositorio: IRepositorios) {
      this.repositorios = repositorio;
    }

    private async validarTodosOsCampus({codigoMunicipio, nome, status}: ICriarBairro){
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
                                                  .andWhere("Bairro.codigoMunicipio = :codigoMunicipio", {codigoMunicipio:codigoMunicipio}).getOne();

      if (bairroExiste) {
        throw new ErrosDaAplicacao('Bairro ja cadastrado nesse municipio', 400);
      }
    }

    public async criarBairro({codigoMunicipio, nome, status}: ICriarBairro,requisicao: Request, resposta: Response ) {
      try{
        const repositorioBairro = this.repositorios.bairroRepositorio;

        await this.validarTodosOsCampus({codigoMunicipio, nome, status});

          const novoBairro = repositorioBairro.create({
            codigoMunicipio: { codigoMunicipio: codigoMunicipio },
            nome: nome,
            status: status,
        });
    
        await repositorioBairro.save(novoBairro);

        const bairros = await repositorioBairro.find({
          select:["codigoBairro", "codigoMunicipio", "nome", "status"], 
          relations:["codigoMunicipio"]
        });
        const todosBairros = bairros.map((bairro) => ({
            codigoBairro: bairro.codigoBairro,
            codigoMunicipio: bairro.codigoMunicipio.codigoMunicipio,
            nome: bairro.nome,
            status: bairro.status
        }));
        return resposta.status(200).json(todosBairros);
          
      }
      catch(error){
        if(error instanceof ErrosDaAplicacao){
          return resposta.status(error.status).json({ mensagem: error.message, status: error.status });
      }
      else {
          return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error});
      }
      }
  }

    private verificaStatusValido(status: number){
      return status === 1 || status === 2;
  }
}
