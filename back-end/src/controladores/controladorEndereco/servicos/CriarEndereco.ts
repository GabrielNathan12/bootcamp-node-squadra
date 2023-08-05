import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";
import { ErrosDaAplicacao } from "../../../errosAplicacao/ErrosDaAplicacao";
import { ListaEndereco } from "./ListarEndereco";

interface ICriarEndereco{
    codigoPessoa: number,
    codigoBairro: number,
    nomeRua: string,
    numero: number, 
    complemento: string,
    cep: string,
    status: number;
}
export class CriarEndereco{
    private repositorios: IRepositorios;

    constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;
    }

    private async validaTodosOsCampus({codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep , status}: ICriarEndereco){
        const pessoaRepositorio = this.repositorios.pessoaRepositorio;
        const bairroRepositorio = this.repositorios.bairroRepositorio;

        const pessoaExiste = await pessoaRepositorio.findOne({where:{codigoPessoa: Number(codigoPessoa)}});
        const bairroExiste = await bairroRepositorio.findOne({where: {codigoBairro: Number(codigoBairro)}});

        if(!pessoaExiste){
            throw new ErrosDaAplicacao('codigoPessoa nao existe', 400);
        }
        if(!status || isNaN(status) || !this.verificaStatusValido(status)){
            throw new ErrosDaAplicacao(`Status do campo invalido: Motivo = ${status}`, 400);
        }
        if(!bairroExiste){
            throw new ErrosDaAplicacao('codigoBairro nao existe', 400);
        }
    }

    public async criarEndereco({codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep , status}: ICriarEndereco, requisicao: Request, resposta: Response){
        
        try{
            const enderecoReposito = this.repositorios.enderecoRepositorio;
            
            await this.validaTodosOsCampus({codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep , status});

            const novoEndereco = enderecoReposito.create({
                codigoPessoa:{codigoPessoa}, codigoBairro:{codigoBairro},
                nomeRua: nomeRua, numero:numero, complemento:complemento, cep:cep, status:status
            });

            await enderecoReposito.save(novoEndereco);

            const enderecos = await enderecoReposito.find({
                select:["codigoEndereco", "codigoPessoa", "codigoBairro", "nomeRua" , "numero", "complemento", "cep", "status"],
                relations:["codigoPessoa", "codigoBairro"]
            });

            const todosEnderecos = enderecos.map((endereco)=>({
                codigoEndereco: endereco.codigoEndereco,
                codigoPessoa: endereco.codigoPessoa.codigoPessoa,
                codigoBairro: endereco.codigoBairro.codigoBairro,
                nomeRua: endereco.nomeRua,
                numero: endereco.numero,
                complemento: endereco.complemento,
                cep: endereco.cep,
                status: endereco.status
            }));

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
    private verificaStatusValido(status: number){
        return status === 1 || status === 2;
    }

}