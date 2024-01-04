import { Request, Response } from "express";
import { ServicosBairros } from "../../servicos/servicoesBairro/ServicosBairro";
import { ExecoesAPIBairro } from "../../execoes/ExecoesAPIBairro";
import { IBairro } from "../../vo/IBairro";
import { CampusNulos, DadosDuplicados, RequisicaoMalFeita, TipoVarivelInvalida } from "../../../configuracoes/helpers/ErrosApi";
import { QueryFailedError } from "typeorm";


export class ControladorBairro{
    private servicos: ServicosBairros;
    private execoesAPI: ExecoesAPIBairro;

    constructor(){
        this.servicos = new ServicosBairros();
        this.execoesAPI = new ExecoesAPIBairro();
    }

    public async criarBairro(requisicao: Request, resposta: Response){
        try {
            const bairro = requisicao.body;

            await this.execoesAPI.verificarCampusNulosCriacao(bairro);
            await this.execoesAPI.verificarTiposDeValoresCriacao(bairro);

            const {codigoMunicipio, nome, status} = bairro;

            const municipioExiste = await this.servicos.procurarMunicipioPeloCodigoMunicipio(codigoMunicipio);

            await this.execoesAPI.existeMunicipioPeloCodigoMunicipio(municipioExiste);

            let existeDuplicata;

            if(municipioExiste){
                existeDuplicata = await this.servicos.existeDuplicadasBairro(nome, municipioExiste.codigoMunicipio);
            }

            await this.execoesAPI.existeDuplicadaBairro(existeDuplicata);

            const novoBairro: IBairro = {codigoMunicipio, nome, status};

            const bairroCriado = await this.servicos.criarNovoBairro(novoBairro);
            
            return resposta.status(200).json(bairroCriado);

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
            if(error instanceof RequisicaoMalFeita){
                return resposta.status(error.statusCode).json({menssagem: error.message});
            }
            return resposta.status(500).json({mensagem: "Erro no servidor interno " + error});
        }
    }

    public async atualizarBairro(requisicao: Request, resposta: Response){
        try {
            const bairro = requisicao.body;
            const {codigoBairro, codigoMunicipio, nome, status} = bairro;
            
            await this.execoesAPI.verificarCampusNulosAtualizacao(bairro);
            await this.execoesAPI.verificarTiposDeValoresAtualizacao(bairro);
            
            const bairroAtualizado: IBairro = {codigoBairro, codigoMunicipio, nome, status};

            const novoBairro = await this.servicos.atualizarBairro(bairroAtualizado, codigoBairro, codigoMunicipio);
            await this.execoesAPI.verificarAtualizacao(novoBairro);

            return resposta.status(200).json(novoBairro);

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
            if(error instanceof RequisicaoMalFeita){
                return resposta.status(error.statusCode).json({menssagem: error.message});
            }
            if(error instanceof QueryFailedError){
                return resposta.status(400).json({mensagem: 'Existe um bairro com o mesmo nome para esse codigoMunicipio'});
            }
            return resposta.status(500).json({mensagem: "Erro no servidor interno " + error});
        }
    }

    public async deletarBairro(requisicao: Request, resposta: Response){
        try {
            const {codigoBairro} = requisicao.params;

            await this.servicos.procurarBairroPeloCodigoBairro(parseInt(codigoBairro));
            await this.execoesAPI.existeBairroPeloCodigoBairro(parseInt(codigoBairro));

            const bairroDeletado = await this.servicos.deletarBairro(parseInt(codigoBairro));

            return resposta.status(200).json(bairroDeletado);
        }
        catch (error) {
            if(error instanceof RequisicaoMalFeita){
                return resposta.status(error.statusCode).json({menssagem: error.message});
            }
            if(error instanceof QueryFailedError){
                return resposta.status(400).json({mensagem: 'Parametro passado não é um numero'});
            }
            return resposta.status(500).json({mensagem: "Erro no servidor interno " + error});
        }
    }

    public async listarBairros(requisicao: Request, resposta: Response){
        try {
            const parametros = requisicao.query;

            if(parametros){
                await this.execoesAPI.verificarParametrosValidos(parametros);
                return resposta.status(200).json(await this.servicos.listarBairrosPorParametros(parametros));
            }
            else{
                return resposta.status(200).json(await this.servicos.listarBairros());
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