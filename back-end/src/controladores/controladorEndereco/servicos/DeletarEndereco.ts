import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

interface IdeletarEndereco{
    codigoEndereco: number
}
export class DeletarEndereco{
    private repositorios: IRepositorios;
    
    constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;
    }
    public async deletarEndereco({codigoEndereco}:IdeletarEndereco, requisicao:Request, resposta: Response){
        const enderecoReposito = this.repositorios.enderecoRepositorio;
        const enderecoExiste = await enderecoReposito.findOne({where:{codigoEndereco: Number(codigoEndereco)}});

        if(!enderecoExiste){
            return resposta.status(400).json({mensagem: 'Endereco nao existe', status: '400'});
        }

        await enderecoReposito.remove(enderecoExiste);
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
}