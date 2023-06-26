import { Request, Response } from "express";
import { ControladorGeral } from "../ControladorGeral";

export class ControladorMunicipio extends ControladorGeral{
    private repositorio = this.repositorios.municipioRepositorio;
    private repositorioUf = this.repositorios.ufRepositorio;

    public async removerDado(requisicao: Request, resposta: Response ) {
        const deletarPeloId = parseInt(requisicao.params.idmunicipio);

        try{
            const codigo_Municipio = await this.repositorio.findOne({where: {CODIGO_MUNICIPIO : deletarPeloId}});

            if(!codigo_Municipio){
                return resposta.status(400).json({mensagem: 'Codigo do municipio não encontrado !'});
            }
            await this.repositorio.remove(codigo_Municipio);

            return resposta.status(200).json({mensagem: 'Deleção completada'});

        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor: ' + erro});
        }
        
    }

    public async listarDado(requisicao: Request, resposta: Response) {
        try{
            const municipios = await this.repositorio.find({
                relations: {
                    BAIRROS: true
                }
            });
            return resposta.status(200).json(municipios);
        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro});
        }
    }
    
    public async atualizarDado(requisicao: Request, resposta: Response ) {
        const { nome, status } = requisicao.body;
        const pegarIdMunicipio = parseInt(requisicao.params.idmunicipio);

        try{
            const codigo_Municipio = await this.repositorio.findOne({where: {CODIGO_MUNICIPIO : pegarIdMunicipio}});
            const nome_municipio = await this.repositorio.findOne({where : {NOME: nome}});

            if(!codigo_Municipio){
                return resposta.status(400).json({mensagem : 'Codigo do municipio não encontrado'});
            }
            if(nome_municipio){
                return resposta.status(400).json({mensagem: 'Nome do municipio ja inserido'});
            }
            if(!this.vericarStatus(Number(status))){
                return resposta.status(400).json({mensagem: 'Status invalido !'});
            }


            codigo_Municipio.NOME =  nome   || codigo_Municipio.NOME;
            codigo_Municipio.STATUS=  status  || codigo_Municipio.STATUS;

            const municipioAtualizado = await this.repositorio.save(codigo_Municipio);

            return resposta.status(200).json({mensagem: municipioAtualizado});
            
        }catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro })
        }
    }

    public async adionarDado(requisicao: Request, resposta: Response) {
        const {codigo_uf ,nome, status} = requisicao.body;

        try{

            const verificarCodigoUF = await this.repositorioUf.findOne({where: {CODIGO_UF:codigo_uf}});

            if(!nome || !status || !codigo_uf){
                return resposta.status(400).json({mensagem: "Nome ou Status e Codigo_UF não encontrados no Json !"});
            }
            else {
                const verificarUmNome = await this.repositorio.findOne({where : {NOME: nome} });

                if(!verificarCodigoUF){
                    return resposta.status(400).json({mensagem: 'Codigo Uf nao encontrado'});
                }
                if(verificarUmNome){
                    return resposta.status(400).json({mensagem: 'Nome já inserido no banco'});
                }

                const novoMunicipio = this.repositorio.create(
                    {
                        CODIGO_UF: codigo_uf,
                        NOME: nome,
                        STATUS: status
                    }
                );
                await this.repositorio.save(novoMunicipio);
                return resposta.status(200).json(novoMunicipio);
            }
        }
        catch(erro){
            return resposta.status(200).json();
        }
    }
}