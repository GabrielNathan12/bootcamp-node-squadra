import { Request, Response } from "express";
import { IRepositorios } from "../../../../Irepositorios/Irepositorios"
import { Servicos } from "../Servicos";
import { ErrosDaAplicacao } from "../../../../errosAplicacao/ErrosDaAplicacao";

interface IEndereco {
    codigoEndereco: number,
    codigoBairro: number;
    nomeRua: string;
    numero: number;
    complemento: string;
    cep: string;
    codigoPessoa: number;
}

export class AtualizarEndereco extends Servicos{

    constructor(repositorio: IRepositorios) {
        super(repositorio);
    }

    public async atualizarEndereco({codigoEndereco,codigoBairro,codigoPessoa ,nomeRua, numero, complemento, cep}: IEndereco, requisicao: Request, resposta: Response){
        try{
            const enderecoReposito = this.obterRepositorioEndereco();
            const bairroRepositorio = this.obterRepositorioBairro();
            const pessoaRepositorio = this.obterRepositorioPessoa();
            
            const enderecoExiste = await enderecoReposito.findOne({where:{codigoEndereco:codigoEndereco}});

            if(!enderecoExiste){
                throw new ErrosDaAplicacao('Endereco nao encontrado', 400);
            }
            const bairroExiste = await bairroRepositorio.findOne({where:{codigoBairro:codigoBairro}});
            
            if(!bairroExiste){
                throw new ErrosDaAplicacao('Bairro nao encontrado', 400);
            }

            const pessoaExiste = await pessoaRepositorio.findOne({where:{codigoPessoa:codigoPessoa}});

            if(!pessoaExiste){
                throw new ErrosDaAplicacao('Pessoa nao encontrado', 400);
            }
            enderecoExiste.codigoPessoa = pessoaExiste;
            enderecoExiste.codigoBairro = bairroExiste;
            enderecoExiste.nomeRua = nomeRua;
            enderecoExiste.numero = numero;
            enderecoExiste.complemento = complemento;
            enderecoExiste.cep = cep;

            await enderecoReposito.save(enderecoExiste);

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