import { Request, Response } from "express";
import { IRepositorios } from "../../../../Irepositorios/Irepositorios";
import { ErrosDaAplicacao } from "../../../../errosAplicacao/ErrosDaAplicacao";
import { Servicos } from "../Servicos";

interface IBairro {
  codigoMunicipio: number;
  nome: string;
  status: number;
}

export class CriarBairro extends Servicos{
   
    constructor(repositorio: IRepositorios) {
      super(repositorio);
    }

    public async criarBairro({codigoMunicipio, nome, status}: IBairro,requisicao: Request, resposta: Response ) {
      try {
        const repositorioBairro = this.obterRepositorio();

        await this.validarTodosOsCampus({codigoMunicipio, nome, status});

          const novoBairro = repositorioBairro.create({
            municipio: { codigoMunicipio: codigoMunicipio },
            nome: nome,
            status: status,
        });
    
        await repositorioBairro.save(novoBairro);

        const bairros = await repositorioBairro.find({
          select:["codigoBairro", "municipio", "nome", "status"], 
          relations:["municipio"]
        });

        const todosBairros = this.listarBairros(bairros);

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
}
