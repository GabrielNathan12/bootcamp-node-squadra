import { Request, Response } from "express";
import { ServicosMunicipios } from "../../servicos/servicosMunicipio/ServicosMunicipio";
import { ExecoesAPIMunicipio } from "../../execoes/ExecoesAPIMunicipio";
import { IMunicipio } from "../../vo/IMunicipio";
import { CampusNulos, DadosDuplicados, RequisicaoMalFeita, TipoVarivelInvalida } from "../../../configuracoes/helpers/ErrosApi";
import { QueryFailedError } from "typeorm";



export class ControladorMunicipio{
    private servicos: ServicosMunicipios;
    private execoesAPI: ExecoesAPIMunicipio;

    constructor(){
        this.servicos = new ServicosMunicipios();
        this.execoesAPI = new ExecoesAPIMunicipio();
    }

    public async criarMunicipio(requisicao: Request, resposta: Response){
        try {
            const municipio = requisicao.body;

            await this.execoesAPI.verificarCampusNulosCriacao(municipio);
            await this.execoesAPI.vericarTiposDeValoresCriacao(municipio);
            
            const {codigoUF, nome, status} = municipio;
            
            const ufExiste = await this.servicos.procurarUFPeloCodigoUF(codigoUF);         
            await this.execoesAPI.existeUFPeloCodigoUF(ufExiste);
            
            let existeDuplicata;

            if(ufExiste){
                existeDuplicata = await this.servicos.existeDuplicatasMunicipio(nome, ufExiste?.codigoUF);
            }
            
            await this.execoesAPI.existeDuplicataMunicipio(existeDuplicata);
            
            const novoMunicipio: IMunicipio = {codigoUF, nome, status};

            const municipioCriado = await this.servicos.criarNovoMunicipio(novoMunicipio);

            return resposta.status(200).json(municipioCriado);
            
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
    
    public async atualizarMunicipio(requisicao: Request, resposta: Response){
        try {
            const municipio = requisicao.body;
            const {codigoMunicipio, codigoUF, nome , status} = municipio;

            await this.execoesAPI.verificarCampusNulosAtualizacao(municipio);
            await this.execoesAPI.vericarTiposDeValoresAtualizacao(municipio);
        
            const municipioAtualizado: IMunicipio = {codigoMunicipio, codigoUF, nome, status};

            const novoMunicipio = await this.servicos.atualizarMunicipio(municipioAtualizado, codigoMunicipio, codigoUF);
            await this.execoesAPI.verificaAtualizacao(novoMunicipio);

            return resposta.status(200).json(novoMunicipio);
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
                return resposta.status(400).json({mensagem: 'Existe um municipio com o mesmo nome para esse codigoUF'});
            }
            return resposta.status(500).json({mensagem: "Erro no servidor interno " + error});
        }
    }

    public async deletarMunicipio(requisicao: Request, resposta: Response){
        try {
            
        }
        catch (error) {
            
        }
    }
    public async listarMunicipio(requisicao: Request, resposta: Response){
        try {
            const parametros = requisicao.query;

            if(parametros){
                await this.execoesAPI.verificarParametrosValidos(parametros);
                return resposta.status(200).json(await this.servicos.listarMunicipioPorParametros(parametros));
            }
            else{
                return resposta.status(200).json(await this.servicos.listarMunicipios());
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