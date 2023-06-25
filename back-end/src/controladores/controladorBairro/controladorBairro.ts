import { Request, Response } from "express-serve-static-core";
import { ControladorGeral } from "../ControladorGeral";
import { bairroRepositorio } from "../../repositorios/bairroRepositorio";

export class ControladorBairro extends ControladorGeral{
    
    public async removerDado(requisicao: Request, resposta: Response ) {
        const deletarPeloId = parseInt(requisicao.params.idbairro);

        try{
            const codigo_bairro = await bairroRepositorio.findOne({where: {Codigo_Bairro : deletarPeloId}});

            if(!codigo_bairro){
                return resposta.status(400).json({mensagem: 'Codigo do bairro não encontrado !'});
            }
            await bairroRepositorio.remove(codigo_bairro);

            return resposta.status(200).json({mensagem: 'Deleção completada'});

        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor: ' + erro});
        }
        
    }

    public async listarDado(requisicao: Request, resposta: Response) {
        try{
            const bairros = await bairroRepositorio.find();

            return resposta.status(200).json(bairros);
        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro});
        }
    }
    
    public async atualizarDado(requisicao: Request, resposta: Response ) {
        const { Nome, Status } = requisicao.body;
        const pegarIdBairro = parseInt(requisicao.params.idbairro);

        try{
            const codigo_bairro = await bairroRepositorio.findOne({where: {Codigo_Bairro : pegarIdBairro}});
            const nome = await bairroRepositorio.findOne({where : {Nome_Bairro: Nome}});

            if(!codigo_bairro){
                return resposta.status(400).json({mensagem : 'Codigo do bairro não encontrado'});
            }
            if(nome){
                return resposta.status(400).json({mensagem: 'Bairro ja inserido'});
            }
            if(!this.vericarStatus(Number(Status))){
                return resposta.status(400).json({mensagem: 'Status invalido !'});
            }


            codigo_bairro.Nome_Bairro =  Nome   || codigo_bairro.Nome_Bairro;
            codigo_bairro.Status=  Status  || codigo_bairro.Status;

            const bairroAtualizado = await bairroRepositorio.save(codigo_bairro);

            return resposta.status(200).json({mensagem: bairroAtualizado});
            
        }catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro })
        }
    }

    public async adionarDado(requisicao: Request, resposta: Response) {
        const {Nome, Status} = requisicao.body;

        try{

            if(!Nome || !Status){
                return resposta.status(400).json({mensagem: "Nome não encontrados !"});
            }
            else {
                const verificarUmNome = await bairroRepositorio.findOne({where : {Nome_Bairro: Nome} });

                if(verificarUmNome){
                    return resposta.status(400).json({mensagem: 'Nome já inserido no banco'});
                }

                if(!this.vericarStatus(Number(Status))){
                    return resposta.status(400).json({mensagem: 'Status invalido'});
                }
                const novoBairro = bairroRepositorio.create(
                    {
                        Codigo_Bairro: Nome,
                        Status: Status
                    }
                );
                await bairroRepositorio.save(novoBairro);
                return resposta.status(200).json(novoBairro);
            }
        }
        catch(erro){
            return resposta.status(200).json();
        }
    }
}