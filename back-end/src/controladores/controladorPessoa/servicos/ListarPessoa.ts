import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";
interface IListaFiltrada{
    codigoPessoa?: number,
    nome?: string,
    sobrenome?:string,
    idade?: number, 
    status?: number,

}
export class ListarPessoa{
    private repositorios: IRepositorios;
    constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;
    }
    public async listarPessoas(requisicao:Request, resposta: Response){
        const pessoaRepositorio = this.repositorios.pessoaRepositorio;
        
        const {codigoPessoa,nome, sobrenome, idade,status} = requisicao.query;
        
        if(codigoPessoa || nome || sobrenome || idade || status){
            this.listaFiltrada(
                {codigoPessoa: Number(codigoPessoa),
                    nome: nome as string,
                    sobrenome: sobrenome as string,
                    idade: Number(idade),
                    status: Number(status)
                }, requisicao, resposta);
        }else{
            return resposta.status(200).json(await pessoaRepositorio.find({relations:{ enderecos: true}})); 
        }
        
    }
    private async listaFiltrada({codigoPessoa,nome, sobrenome, idade, status}:IListaFiltrada, requisicao: Request,resposta: Response){
        try{
            const filtarPessoa: any = {};
            if(codigoPessoa){
                filtarPessoa.codigoPessoa = Number(codigoPessoa);
            }
            if(nome){
                filtarPessoa.nome = nome;
            }
            if(sobrenome){
                filtarPessoa.sobrenome = sobrenome;
            }
            if(idade){
                filtarPessoa.idade = Number(idade);
            }
            if(status !== undefined) {
                const statusNumero = Number(status);

                if(statusNumero === 0 || statusNumero === 1){
                    filtarPessoa.status = Number(status);
                }

            }
            
            const pessoaFiltrada = await this.repositorios.pessoaRepositorio.find({where: filtarPessoa});
            return resposta.status(200).json(pessoaFiltrada);
        }
        catch(error){
            return resposta.status(400).json({ mensagem: 'Erro ao filtrar as pessoas', status: '400'+ error });
        }
    }
}