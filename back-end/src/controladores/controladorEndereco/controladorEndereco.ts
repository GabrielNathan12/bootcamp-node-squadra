import { Request, Response } from "express-serve-static-core";
import { ControladorGeral } from "../ControladorGeral";
import { enderecoRepositorio } from "../../repositorios/enderecosRepositorio";

export class ControladorEndereco extends ControladorGeral{
    public async removerDado(requisicao: Request, resposta: Response ) {
        const deletarPeloId = parseInt(requisicao.params.idendereco);

        try{
            const codigo_endero = await enderecoRepositorio.findOne({where: {Codigo_Endereco : deletarPeloId}});

            if(!codigo_endero){
                return resposta.status(400).json({mensagem: 'Codigo da pessoa não encontrado !'});
            }
            await enderecoRepositorio.remove(codigo_endero);

            return resposta.status(200).json({mensagem: 'Deleção completada'});

        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor: ' + erro});
        }
        
    }

    public async listarDado(requisicao: Request, resposta: Response) {
        try{
            const enderecos = await enderecoRepositorio.find();

            return resposta.status(200).json(enderecos);
        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro});
        }
    }
    
    public async atualizarDado(requisicao: Request, resposta: Response ) {
        const { Nome_Rua, Complemento, CEP , Status } = requisicao.body;
        const pegarIdEndereco = parseInt(requisicao.params.idendereco);
        
        try{
            const codigo_endereco = await enderecoRepositorio.findOne({where: {Codigo_Endereco : pegarIdEndereco}});

            if(!codigo_endereco){
                return resposta.status(400).json({mensagem : 'Codigo do enderco não encontrado'});
            }
            if(!this.vericarStatus(Number(Status))){
                return resposta.status(400).json({mensagem: 'Status invalido !'});
            }


            codigo_endereco.Nome_Rua =  Nome_Rua   || codigo_endereco.Nome_Rua;
            codigo_endereco.Complemento = Complemento || codigo_endereco.Complemento;
            codigo_endereco.CEP = CEP || codigo_endereco.CEP;
            codigo_endereco.Status=  Status  || codigo_endereco.Status;

            const enderecoAtualizada = await enderecoRepositorio.save(codigo_endereco);

            return resposta.status(200).json({mensagem: enderecoAtualizada});
            
        }catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro })
        }
    }

    public async adionarDado(requisicao: Request, resposta: Response) {
        const { Nome_Rua, Complemento, CEP , Status } = requisicao.body;

        try{

            if(!Nome_Rua || !Status || !CEP || !Complemento ){
                return resposta.status(400).json({mensagem: "Nome não encontrados !"});
            }
            else {

                if(!this.vericarStatus(Number(Status))){
                    return resposta.status(400).json({mensagem: 'Status invalido'});
                }
                const novoEndereco = enderecoRepositorio.create(
                    {
                        Nome_Rua: Nome_Rua,
                        CEP: CEP,
                        Complemento: Complemento,
                        Status: Status
                    }
                );
                await enderecoRepositorio.save(novoEndereco);
                return resposta.status(200).json(novoEndereco);
            }
        }
        catch(erro){
            return resposta.status(200).json();
        }
    }
}