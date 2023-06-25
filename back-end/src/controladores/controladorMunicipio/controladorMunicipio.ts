import { ParamsDictionary, Request, Response } from "express-serve-static-core";
import { ControladorGeral } from "../ControladorGeral";

import { municipioRepositorio } from "../../repositorios/municipioRepositorio";
import { ufRepositorio } from "../../repositorios/ufRepositorio";

export class ControladorMunicipio extends ControladorGeral{
    
    public async removerDado(requisicao: Request, resposta: Response ) {
        const deletarPeloId = parseInt(requisicao.params.idmunicipio);

        try{
            const codigo_Municipio = await municipioRepositorio.findOne({where: {Codigo_Municipio : deletarPeloId}});

            if(!codigo_Municipio){
                return resposta.status(400).json({mensagem: 'Codigo do municipio não encontrado !'});
            }
            await municipioRepositorio.remove(codigo_Municipio);

            return resposta.status(200).json({mensagem: 'Deleção completada'});

        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor: ' + erro});
        }
        
    }

    public async listarDado(requisicao: Request, resposta: Response) {
        try{
            const municipios = await municipioRepositorio.find({
                relations: {
                    Bairros: true
                }
            });
            return resposta.status(200).json(municipios);
        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro});
        }
    }
    
    public async atualizarDado(requisicao: Request, resposta: Response ) {
        const { Nome, Status } = requisicao.body;
        const pegarIdMunicipio = parseInt(requisicao.params.idmunicipio);

        try{
            const codigo_Municipio = await municipioRepositorio.findOne({where: {Codigo_Municipio : pegarIdMunicipio}});
            const nome = await municipioRepositorio.findOne({where : {Nome: Nome}});

            if(!codigo_Municipio){
                return resposta.status(400).json({mensagem : 'Codigo do municipio não encontrado'});
            }
            if(nome){
                return resposta.status(400).json({mensagem: 'Nome do municipio ja inserido'});
            }
            if(!this.vericarStatus(Number(Status))){
                return resposta.status(400).json({mensagem: 'Status invalido !'});
            }


            codigo_Municipio.Nome =  Nome   || codigo_Municipio.Nome;
            codigo_Municipio.Status=  Status  || codigo_Municipio.Status;

            const municipioAtualizado = await municipioRepositorio.save(codigo_Municipio);

            return resposta.status(200).json({mensagem: municipioAtualizado});
            
        }catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro })
        }
    }

    public async adionarDado(requisicao: Request, resposta: Response) {
        const {Codigo_UF ,Nome, Status} = requisicao.body;

        try{

            const verificarCodigoUF = await ufRepositorio.findOne({where: {Codigo_UF:Codigo_UF}});

            if(!Nome || !Status || !Codigo_UF){
                return resposta.status(400).json({mensagem: "Sigla ou Nome ou Status não encontrados !"});
            }
            else {
                const verificarUmNome = await municipioRepositorio.findOne({where : {Nome: Nome} });

                if(!verificarCodigoUF){
                    return resposta.status(400).json({mensagem: 'Codigo Uf nao encontrado'});
                }
                if(verificarUmNome){
                    return resposta.status(400).json({mensagem: 'Nome já inserido no banco'});
                }

                if(!this.vericarStatus(Number(Status))){
                    return resposta.status(400).json({mensagem: 'Status invalido'});
                }
                const novoMunicipio = municipioRepositorio.create(
                    {
                        codigo_UF: Codigo_UF,
                        Nome: Nome,
                        Status: Status
                    }
                );
                await municipioRepositorio.save(novoMunicipio);
                return resposta.status(200).json(novoMunicipio);
            }
        }
        catch(erro){
            return resposta.status(200).json();
        }
    }
}