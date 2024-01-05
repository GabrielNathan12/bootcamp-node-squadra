import { Request, Response } from "express";
import { IPessoa } from "../../vo/IPessoa";
import { ExecoesAPIPessoa } from "../../execoes/ExecoesAPIPessoa";
import { ServicosPessoas } from "../../servicos/servicosPessoa/ServicosPessoa";
import { ControladorEndereco } from "../controladorEndereco/controladorEndereco";
import { CampusNulos, RequisicaoMalFeita, TipoVarivelInvalida } from "../../../configuracoes/helpers/ErrosApi";
import { QueryFailedError } from "typeorm";


export class ControladorPessoa{
    private execoesAPI: ExecoesAPIPessoa;

    private servicosPessoas: ServicosPessoas;

    constructor(){
        this.execoesAPI = new ExecoesAPIPessoa();
        this.servicosPessoas = new ServicosPessoas();
    }


    public async criarNovaPessoa(requisicao: Request, resposta: Response){
        try {
            const {nome, sobrenome, idade, login, senha, status, enderecos} = requisicao.body;
            await this.execoesAPI.verificaCampusNulosCriacao(nome, sobrenome, idade, login, senha, status);
            await this.execoesAPI.verificaTiposDeValoresCriacao(nome, sobrenome, idade, login, senha, status);
            const pessoa: IPessoa = {nome, sobrenome, idade, login, senha, status};

            const novaPessoa = await this.servicosPessoas.criarNovaPessoa(pessoa);

            if(enderecos){
                const controladorEndereco = new ControladorEndereco();
                await controladorEndereco.criarEnderecos(enderecos, novaPessoa, requisicao, resposta);
            }
            
            return resposta.status(200).json(await this.servicosPessoas.listarPessoas());

        }
        catch (error) {
            if(error instanceof CampusNulos){
                return resposta.status(error.statusCode).json({menssagem: error.message});
            }
            if(error instanceof TipoVarivelInvalida){
                return resposta.status(error.statusCode).json({menssagem: error.message});
            }
            if(error instanceof QueryFailedError){
                return resposta.status(400).json({mensagem: 'Email já cadastrado'});
            }
            if(error instanceof RequisicaoMalFeita){
                return resposta.status(error.statusCode).json({menssagem: error.message});
            }
            return resposta.status(500).json({mensagem: "Erro no servidor interno " + error});
        }
    }

    public async atualizarPessoa(requisicao: Request, resposta: Response){
        try {
            
        }
        catch (error) {
            
        }
    }
    public async deletarPessoa(requisicao: Request, resposta: Response){
        try {
            
        }
        catch (error) {
            
        }
    }
    public async listarPessoa(requisicao: Request, resposta: Response){
        try {
            return resposta.status(200).json(await this.servicosPessoas.listarPessoas());
        }
        catch (error) {
            
        }
    }
}