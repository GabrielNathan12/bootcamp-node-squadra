import { Request, Response } from "express";
import { IRepositorios } from "../../../../Irepositorios/Irepositorios";
import { ErrosDaAplicacao } from "../../../../errosAplicacao/ErrosDaAplicacao";
import { Servicos } from "../Servicos";


interface IEndereco{
    codigoPessoa: number,
    codigoBairro: number,
    nomeRua: string,
    numero: number, 
    complemento: string,
    cep: string,
    status: number;
}
export class CriarEndereco extends Servicos{
   

    constructor(repositorio: IRepositorios) {
        super(repositorio);
    }

    private async validaTodosOsCampus({codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep}: IEndereco){
        const pessoaRepositorio = this.obterRepositorioPessoa();
        const bairroRepositorio = this.obterRepositorioBairro();

        if(!nomeRua){
            throw new ErrosDaAplicacao('nomeRua nao existe', 400);
        }
        if(!numero){
            throw new ErrosDaAplicacao('numero nao existe', 400);
        }
        if(!complemento){
            throw new ErrosDaAplicacao('complemento nao existe', 400);
        }
        if(!cep){
            throw new ErrosDaAplicacao('cep nao existe', 400);
        }
        
        const pessoaExiste = await pessoaRepositorio.findOne({where:{codigoPessoa: Number(codigoPessoa)}});
        const bairroExiste = await bairroRepositorio.findOne({where: {codigoBairro: Number(codigoBairro)}});

        if(!pessoaExiste){
            throw new ErrosDaAplicacao('codigoPessoa nao existe', 400);
        }
        if(!bairroExiste){
            throw new ErrosDaAplicacao('codigoBairro nao existe', 400);
        }
    }

    public async criarEndereco({codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep , status}: IEndereco, requisicao: Request, resposta: Response){
        
        try{
            const enderecoReposito = this.obterRepositorioEndereco();
            
            await this.validaTodosOsCampus({codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep , status});

            const novoEndereco = enderecoReposito.create({
                codigoPessoa:{codigoPessoa}, codigoBairro:{codigoBairro},
                nomeRua: nomeRua, numero:numero, complemento:complemento, cep:cep
            });

            await enderecoReposito.save(novoEndereco);

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