import { Request, Response } from "express-serve-static-core";
import { ControladorGeral } from "../ControladorGeral";
import { ufRepositorio } from "../../repositorios/ufRepositorio";

export class ControladorMunicipio extends ControladorGeral{
    public async removerDado(requisicao: Request, resposta: Response ) {
        const {Sigla, Nome, Status} = requisicao.body;

        try{
            if(!Sigla || !Nome || !Status){
                return resposta.status(400).json({mensagem: "Sigla ou Nome ou Status não encontrados !"});
            }
            else {
                const verificarUmNome = await ufRepositorio.findOne({where : {Nome: Nome} });
                const vericarUmaSigla = await ufRepositorio.findOne({where: {Sigla: Sigla}});

                if(verificarUmNome){
                    return resposta.status(400).json({mensagem: 'Nome já inserido no banco'});
                }
                if (vericarUmaSigla){
                    return resposta.status(400).json({mensagem: 'Sigla já inserida no banco de dados'});
                }

                const novoUf = ufRepositorio.create(
                    {
                        Sigla: Sigla,
                        Nome: Nome,
                        Status: Status
                    }
                );
                await ufRepositorio.save(novoUf);
                return resposta.status(200).json(novoUf);
            }
        }
        catch(erro){
            return resposta.status(200).json();
        }
        
    }
    public async atualizarDado(requisicao: Request, resposta: Response ) {
        const { Sigla, Nome, Status } = requisicao.body;
        const pegarIdUf = parseInt(requisicao.params.iduf);

        try{
            const codigo_UF = await ufRepositorio.findOne({where: {Codigo_UF : pegarIdUf}});
            const sigla = await ufRepositorio.findOne({where: {Sigla: Sigla}});
            const nome = await ufRepositorio.findOne({where : {Nome: Nome}});

            if(!codigo_UF){
                return resposta.status(400).json({mensagem : 'Codigo Uf não encontrado'});
            }
            if(sigla || nome){
                return resposta.status(400).json({mensagem: 'Nome ou Sigla já inseridos'});
            }
            codigo_UF.Sigla =  Sigla   || codigo_UF.Sigla;
            codigo_UF.Nome  =  Nome    || codigo_UF.Nome;
            codigo_UF.Status=  Status  || codigo_UF.Status;

            const ufAtualizado = await ufRepositorio.save(codigo_UF);

            return resposta.status(200).json({mensagem: ufAtualizado});
            
        }catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro })
        }
    }
    public async listarDado(requisicao: Request, resposta: Response ) {
        return resposta.status(200).json();
    }

    public async adionarDado(requisicao: Request, resposta: Response) {
        const {Sigla, Nome, Status} = requisicao.body;

        try{
            if(!Sigla || !Nome || !Status){
                return resposta.status(400).json({mensagem: "Sigla ou Nome ou Status não encontrados !"});
            }
            else {
                const verificarUmNome = await ufRepositorio.findOne({where : {Nome: Nome} });
                const vericarUmaSigla = await ufRepositorio.findOne({where: {Sigla: Sigla}});

                if(verificarUmNome){
                    return resposta.status(400).json({mensagem: 'Nome já inserido no banco'});
                }
                if (vericarUmaSigla){
                    return resposta.status(400).json({mensagem: 'Sigla já inserida no banco de dados'});
                }

                const novoUf = ufRepositorio.create(
                    {
                        Sigla: Sigla,
                        Nome: Nome,
                        Status: Status
                    }
                );
                await ufRepositorio.save(novoUf);
                return resposta.status(200).json(novoUf);
            }
        }
        catch(erro){
            return resposta.status(200).json();
        }
    }
}