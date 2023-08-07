import { Request, Response } from "express";
import { IRepositorios } from "../../../../Irepositorios/Irepositorios";
import { Servicos } from "../Servicos";
import { ErrosDaAplicacao } from "../../../../errosAplicacao/ErrosDaAplicacao";

interface IPessoa{
    codigoPessoa: number;
}

export class DeletarPessoa extends Servicos{

    constructor(repositorio: IRepositorios) {
        super(repositorio);
    }

    public async deletarPessoa({codigoPessoa}:IPessoa, requisicao: Request, resposta: Response){
        try{
            const pessoaRepositorio = this.obterRepositorioPessoa();
            
            const pessoa = await pessoaRepositorio.findOne({where: {codigoPessoa: codigoPessoa}});

            if(!pessoa){
                throw new ErrosDaAplicacao("Pessoa nao cadastrada", 400);
            }
            await pessoaRepositorio.remove(pessoa);
            
            const pessoas = await pessoaRepositorio.find({
                select: ["codigoPessoa", "nome", "sobrenome", "idade", "login", "senha","status" , "enderecos"],
                relations: ["enderecos"]
            });

            const todasAsPessoas = this.listarTodasPessoas(pessoas);

            return resposta.status(200).json(todasAsPessoas);

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