import { Request, Response } from "express";
import { IRepositorios } from "../../../../Irepositorios/Irepositorios";
import { Servicos } from "../Servicos";
import { ErrosDaAplicacao } from "../../../../errosAplicacao/ErrosDaAplicacao";

interface IEndereco{
    codigoEndereco: number
}
export class DeletarEndereco extends Servicos{
  
    constructor(repositorio: IRepositorios) {
        super(repositorio);
    }
    public async deletarEndereco({codigoEndereco}:IEndereco, requisicao:Request, resposta: Response){
        try{
            const enderecoReposito = this.obterRepositorioEndereco();
            const enderecoExiste = await enderecoReposito.findOne({where:{codigoEndereco: Number(codigoEndereco)}});

            if(!enderecoExiste){
                throw new ErrosDaAplicacao('Endereco nao existe', 400);
            }

            await enderecoReposito.remove(enderecoExiste);


            const enderecos = await enderecoReposito.find({
                    select:["codigoEndereco", "codigoPessoa", "codigoBairro", "nomeRua" , "numero", "complemento", "cep"],
                    relations:["codigoPessoa", "codigoBairro"]
            });

            const todosEnderecos = this.listarTodosEnderecos(enderecos);

            return resposta.status(200).json(todosEnderecos);
            
        }
        catch(error){
            if(error instanceof ErrosDaAplicacao){
                return resposta.status(error.status).json({ mensagem: error.message, status: error.status });
            }
            else{
                return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error});
            } 
        }
    }
}