import { Request, Response } from "express";
import { ExecoesAPIEnderecos } from "../../execoes/ExecoesAPIEndereco";
import { ServicosEnderecos } from "../../servicos/servicosEndereco/ServicosEnderecos";
import { IEndereco } from "../../vo/IEndereco";
import { CampusNulos, RequisicaoMalFeita, TipoVarivelInvalida } from "../../../configuracoes/helpers/ErrosApi";
import { QueryFailedError } from "typeorm";


export class ControladorEndereco{
    private execoesAPI: ExecoesAPIEnderecos;
    private servicosEnderecos: ServicosEnderecos;

    constructor(){
        this.execoesAPI = new ExecoesAPIEnderecos();
        this.servicosEnderecos = new ServicosEnderecos();
    }

    public async criarEnderecos(enderecos: any, codigoPessoa: number, requisicao: Request, resposta: Response){
 
        if(Array.isArray(enderecos)){
            try {
                await Promise.all(enderecos.map(async (endereco: any) => {
                    const bairro = await this.servicosEnderecos.procurarBairroPeloCodigoBairro(endereco.codigoBairro);
                    await this.execoesAPI.verificaSeBairroExistePeloCodigoBairro(bairro);
    
                    await this.execoesAPI.verificaCampusNulosCriacao(endereco.codigoBairro, endereco.nomeRua, endereco.numero, endereco.complemento, endereco.cep);
                    await this.execoesAPI.verificaTiposDeValoresCriacao(endereco.codigoBairro, endereco.nomeRua, endereco.numero, endereco.complemento, endereco.cep);
    
                    let novosEnderecos: IEndereco = endereco;
    
                    await this.servicosEnderecos.criarEnderecos(novosEnderecos, codigoPessoa);
                }));    
            }
            catch (error) {
               throw error;
            
            }
        }
    }

    public async deletarEnderecos(requisicao: Request, resposta: Response){
        try {
            
        }
        catch (error) {
            
        }
    }
    public async atualizarEndereco(requisicao: Request, resposta: Response){
        try {
            
        }
        catch (error) {
            
        }
    }
    public async listarEnderecos(requisicao: Request, resposta: Response){
        try {
            
        }
        catch (error) {
            
        }
    }
}