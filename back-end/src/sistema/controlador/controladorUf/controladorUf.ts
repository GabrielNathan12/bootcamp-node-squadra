import { Request, Response } from "express";
import { ExecoesAPIUF } from "../../execoes/ExecoesAPIUF";
import { ServicosUF } from "../../servicos/servicosUF/ServicosUF";
import { IUF } from "../../vo/IUF";
import { CampusNulos, DadosDuplicados, RequisicaoMalFeita, TipoVarivelInvalida } from "../../../configuracoes/helpers/ErrosApi";


export class ControladorUF{
    private execoesApi: ExecoesAPIUF;
    private servicos: ServicosUF;

    constructor(){
        this.execoesApi = new ExecoesAPIUF();
        this.servicos = new ServicosUF();
    }

    public async criarUf(requisicao: Request, resposta: Response){
        try {
            const uf = requisicao.body;
            await this.execoesApi.verificarCampusNulosCriacao(uf);
            await this.execoesApi.vericartiposDeValoresCriacao(uf);

            const novoUf: IUF = uf;

            const nomeExiste = await this.servicos.nomeUfExiste(novoUf.nome);
            const siglaExiste = await this.servicos.siglaUfExiste(novoUf.sigla);
            
            await this.execoesApi.verificarDuplicadasCriacao(nomeExiste, siglaExiste);
            const ufNovo = await this.servicos.criarNovoUf(novoUf);
            return resposta.status(200).json(ufNovo);

        }
        catch (error) {
            if(error instanceof CampusNulos){
                return resposta.status(error.statusCode).json({menssagem: error.message});
            }
            if(error instanceof TipoVarivelInvalida){
                return resposta.status(error.statusCode).json({menssagem: error.message});
            }
            if(error instanceof DadosDuplicados){
                return resposta.status(error.statusCode).json({menssagem: error.message});
            }
            return resposta.status(500).json({mensagem: "Erro no servidor interno " + error});
        }
    }

    public async atualizarUf(requisicao: Request, resposta: Response){

    }
    public async deletarUf(requisicao: Request, resposta: Response){

    }
    public async listarUf(requisicao: Request, resposta: Response){
        try {
            const parametros = requisicao.query;

            if(parametros){
                await this.execoesApi.verificarParametrosValidos(parametros);
                return resposta.status(200).json(await this.servicos.listarUfPorParametros(parametros));
            }
            else{
                return resposta.status(200).json(await this.servicos.listarTodosUfs());
            }
        }
        catch (error) {
            if(error instanceof RequisicaoMalFeita){
                return resposta.status(error.statusCode).json({menssagem: error.message});
            }
            return resposta.status(500).json({mensagem: "Erro no servidor interno " + error});
        }
        
    }
}