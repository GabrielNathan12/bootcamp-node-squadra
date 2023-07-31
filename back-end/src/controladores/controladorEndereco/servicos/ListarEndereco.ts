import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

interface IListaFiltrada{
    codigoEndereco?: number, 
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
    public async litaEndereco(requisicao: Request, reposta:Response){
        const enderecoReposito = this.repositorios.enderecoRepositorio;
        const {codigoEndereco, nomeRua, numero, complemento, cep, status} = requisicao.query;

        if(codigoEndereco || nomeRua || numero || complemento || cep || status){
            this.listaFiltrada({
                codigoEndereco: Number(codigoEndereco),
                nomeRua: nomeRua as string,
                numero: Number(numero),
                complemento: complemento as string,
                cep: cep as string, 
                status: Number(status)
            }, requisicao, reposta);
        }
        else{
            return reposta.status(200).json(await enderecoReposito.find({relations:{codigoBairro: true, codigoPessoa:true}}));
        }
    }

    private async listaFiltrada({codigoEndereco,nomeRua, numero, complemento, cep, status}: IListaFiltrada, requisicao: Request, resposta: Response){
        try{
            let filtarEnderecos: any = {};
            
            if(codigoEndereco){
                filtarEnderecos.codigoEndereco = Number(codigoEndereco);
            }
            if(nomeRua){
                filtarEnderecos.nomeRua = nomeRua;
            }
            if(numero){
                filtarEnderecos.numero = Number(numero);
            }
            if(complemento){
                filtarEnderecos.complemento = complemento;
            }
            if(cep){
                filtarEnderecos.cep = cep;
            }
            if(status !== undefined) {
                const statusNumero = Number(status);

                if(statusNumero === 0 || statusNumero === 1){
                    filtarEnderecos.status = Number(status);
                }
            }
            const enderecoFiltrado = await this.repositorios.enderecoRepositorio.find({where: filtarEnderecos});

            return resposta.status(200).json(enderecoFiltrado);

        }catch(error){
            return resposta.status(400).json({ mensagem: 'Erro ao filtrar os enderecos', status: '400'+ error });
        }
    }
}