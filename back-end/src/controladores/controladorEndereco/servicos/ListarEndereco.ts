import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

interface IListaFiltrada{
    codigoEndereco?: number,
    codigoPessoa?: number,
    codigoBairro?: number,
    nomeRua?: string, 
    numero?: number, 
    complemento?: string, 
    cep?: string, 
    status?: number
}
export class ListaEndereco{
    private repositorios: IRepositorios;

    constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;
    }
    
    public async litaEndereco(requisicao: Request, resposta:Response){
        const enderecoReposito = this.repositorios.enderecoRepositorio;
        const {codigoEndereco,codigoPessoa, codigoBairro ,nomeRua, numero, complemento, cep, status} = requisicao.query;

        if(codigoEndereco || codigoPessoa || codigoBairro || nomeRua || numero || complemento || cep || status){
            if(!Number(status) || (Number(status) !== 1 && Number(status) !== 2)){
                if(status !== undefined){
                    return resposta.status(400).json({ mensagem: `Status invalido na busca, valor = ${status}`, status: '400'});
                }
            }
            this.listaFiltrada({
                codigoEndereco:Number(codigoEndereco), codigoPessoa:Number(codigoPessoa), 
                codigoBairro:Number(codigoBairro),nomeRua: nomeRua as string, numero:Number(numero), complemento: complemento as string,
                cep: cep as string, status: Number(status)}, requisicao, resposta);
        }
        else{
            try{
                const enderecos = await enderecoReposito.find({
                    select:["codigoEndereco", "codigoPessoa", "codigoBairro", "nomeRua" , "numero", "complemento", "cep"],
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
                }));

                return resposta.status(200).json(todosEnderecos);

            }catch(error){
                return resposta.status(400).json({mensagem: "Erro ao listar os municipios", error})
            }
            
        }
    }

    private async listaFiltrada({
        codigoEndereco, codigoPessoa, 
        codigoBairro,nomeRua, numero, complemento,
        cep, status}: IListaFiltrada, requisicao: Request, resposta: Response){
        
        try{
            let filtarEnderecos: any = {};
            
            if(codigoEndereco){
                filtarEnderecos.codigoEndereco = Number(codigoEndereco);
            }
            if(codigoPessoa){
                filtarEnderecos.codigoPessoa = Number(codigoPessoa);
            }
            if(codigoBairro){
                filtarEnderecos.codigoBairro = Number(codigoBairro);
            }
            if(nomeRua){
                filtarEnderecos.nomeRua = nomeRua as string;
            }
            if(numero){
                filtarEnderecos.numero = Number(numero);
            }
            if(complemento){
                filtarEnderecos.complemento = complemento as string;
            }
            if(cep){
                filtarEnderecos.cep = cep as string;
            }
            if(status !== undefined) {
                const statusNumero = Number(status);

                if(statusNumero === 1 || statusNumero === 2){
                    filtarEnderecos.status = Number(status);
                }
            }
            const enderecos = await this.repositorios.enderecoRepositorio.find({
                where: filtarEnderecos,
                select:["codigoEndereco", "codigoPessoa", "codigoBairro", "nomeRua" , "numero", "complemento", "cep"],
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
            }));

            return resposta.status(200).json(todosEnderecos);

        }catch(error){
            return resposta.status(400).json({ mensagem: 'Erro ao filtrar os enderecos', status: '400'+ error });
        }
    }
}