import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";
interface IListaFiltrada{
    codigoPessoa?: number,
    login?:string,
    status?: number,

}
export class ListarPessoa{
    private repositorios: IRepositorios;
    
    constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;
    }
    
    public async listarPessoas(requisicao:Request, resposta: Response){
        const pessoaRepositorio = this.repositorios.pessoaRepositorio;
        
        const {codigoPessoa,login,status} = requisicao.query;
        
        if(codigoPessoa || login  || status){
            if(!Number(status) || (Number(status) !== 1 && Number(status) !== 2)){
                if(status !== undefined){
                    return resposta.status(400).json({ mensagem: `Status invalido na busca, valor = ${status}`, status: 400});
                }
                
            }
            this.listaFiltrada({
                    codigoPessoa: Number(codigoPessoa),
                    login: login as string,
                    status: Number(status)
                }, requisicao, resposta);
        }
        else {
            try{
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

            }catch(error){
                return resposta.status(400).json({mensagem: "Erro ao listar os municipios", error})
            }
        }
        
    }
    private async listaFiltrada({codigoPessoa,login, status}:IListaFiltrada, requisicao: Request,resposta: Response){
        try{
            let filtarPessoa: any = {};

            if(codigoPessoa){
                filtarPessoa.codigoPessoa = Number(codigoPessoa);
            }
            
            if(login){
                filtarPessoa.login = login;
            }
            if(status !== undefined) {
                const statusNumero = Number(status);

                if(statusNumero === 1 || statusNumero === 2){
                    filtarPessoa.status = Number(status);
                }

            }
            
            const pessoas = await this.repositorios.pessoaRepositorio.find({
                where: filtarPessoa,
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
        catch(error){
            return resposta.status(400).json({ mensagem: 'Erro ao filtrar as pessoas', status: '400'+ error });
        }
    }
}