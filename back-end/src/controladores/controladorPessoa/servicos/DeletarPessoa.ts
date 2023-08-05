import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

interface IdeletarPessoa{
    codigoPessoa: number;
}

export class DeletarPessoa{
    private repositorios: IRepositorios;
    constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;
    }
    public async deletarPessoa({codigoPessoa}:IdeletarPessoa, requisicao: Request, resposta: Response){
        const pessoaRepositorio = this.repositorios.pessoaRepositorio;
        const pessoa = await pessoaRepositorio.findOne({where: {codigoPessoa: codigoPessoa}});

        if(!pessoa){
            return resposta.status(400).json({mensagem:'Pessoa nao encontrada', status:'400'});
        }
        await pessoaRepositorio.remove(pessoa);
        
        const pessoas = await pessoaRepositorio.find({
            select: ["codigoPessoa", "nome", "sobrenome", "idade", "login", "senha","status" , "enderecos"],
            relations: ["enderecos"]
        });

        const todasAsPessoas = pessoas.map((pessoa) =>({
            codigoPessoa: pessoa.codigoPessoa,
            nome: pessoa.nome,
            sobrenome: pessoa.sobrenome,
            idade: pessoa.idade,
            login: pessoa.login,
            senha: pessoa.senha,
            status: pessoa.status,

            enderecos: pessoa.enderecos.map((endereco)=>({
                codigoEndereco: endereco.codigoEndereco,
                nomeRua: endereco.nomeRua,
                numero: endereco.numero,
                complemento: endereco.complemento,
                cep: endereco.cep,
                status: endereco.status
            }))
        }));

        return resposta.status(200).json(todasAsPessoas);
    }
}