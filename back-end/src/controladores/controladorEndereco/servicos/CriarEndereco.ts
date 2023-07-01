import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

interface IcriarEndereco{
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

    public async criarEndereco({codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep , status}: IcriarEndereco, requisicao: Request, resposta: Response){
        const enderecoReposito = this.repositorios.enderecoRepositorio;
        const pessoaRepositorio = this.repositorios.pessoaRepositorio;
        const bairroRepositorio = this.repositorios.bairroRepositorio;

        const pessoaExiste = await pessoaRepositorio.findOne({where:{codigoPessoa: Number(codigoPessoa)}});
        const bairroExiste = await bairroRepositorio.findOne({where: {codigoBairro: Number(codigoBairro)}});

        if(!pessoaExiste){
            return resposta.status(400).json({mensagem: 'Codigo Pessoa nao existe', status:'400'});
        }
        if(!bairroExiste){
            return resposta.status(400).json({mensagem: 'Codigo Bairro nao existe', status: '400'});
        }

        const novoEndereco = enderecoReposito.create({
            codigoPessoa:{codigoPessoa}, codigoBairro:{codigoBairro},nomeRua: nomeRua, numero:numero, complemento:complemento, cep:cep, status:status
        });

        await enderecoReposito.save(novoEndereco);

        return resposta.status(200).json(await enderecoReposito.find({}));
    }

}