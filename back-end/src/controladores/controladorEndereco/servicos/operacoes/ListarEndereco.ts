import { Request, Response } from "express";
import { IRepositorios } from "../../../../Irepositorios/Irepositorios";
import { Servicos } from "../Servicos";

interface IEndereco{
    codigoEndereco?: number,
    codigoPessoa?: number,
    codigoBairro?: number,
    nomeRua?: string, 
    numero?: number, 
    complemento?: string, 
    cep?: string
}
export class ListaEndereco extends Servicos{

    constructor(repositorio: IRepositorios) {
        super(repositorio);
    }
    
    public async litaEndereco(requisicao: Request, resposta:Response){
        const enderecoReposito = this.obterRepositorioEndereco();
        const {codigoEndereco,codigoPessoa, codigoBairro ,nomeRua, numero, complemento, cep} = requisicao.query;

        if(codigoEndereco || codigoPessoa || codigoBairro || nomeRua || numero || complemento || cep){
            this.listaFiltrada({
                codigoEndereco:Number(codigoEndereco), codigoPessoa:Number(codigoPessoa), 
                codigoBairro:Number(codigoBairro),nomeRua: nomeRua as string, numero:Number(numero), complemento: complemento as string,
                cep: cep as string}, requisicao, resposta);
        }
        else{
            try{
                const enderecos = await enderecoReposito.find({
                    select:["codigoEndereco", "pessoa", "bairro", "nomeRua" , "numero", "complemento", "cep"],
                    relations:["pessoa", "bairro"]
                });

                const todosEnderecos = this.listarTodosEnderecos(enderecos);

                return resposta.status(200).json(todosEnderecos);

            }catch(error){
                return resposta.status(400).json({mensagem: "Erro ao listar os municipios", error})
            }
            
        }
    }

    private async listaFiltrada({ codigoEndereco, codigoPessoa, codigoBairro,nomeRua, numero, complemento, cep}: IEndereco,
                                requisicao: Request, resposta: Response){
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
            const enderecos = await this.obterRepositorioEndereco().find({
                where: filtarEnderecos,
                select:["codigoEndereco", "pessoa", "bairro", "nomeRua" , "numero", "complemento", "cep"],
                relations:["pessoa", "bairro"]
            });

            const todosEnderecos = this.listarTodosEnderecos(enderecos);

            return resposta.status(200).json(todosEnderecos);

        }catch(error){
            return resposta.status(400).json({ mensagem: 'Erro ao filtrar os enderecos', status: '400'+ error });
        }
    }
}