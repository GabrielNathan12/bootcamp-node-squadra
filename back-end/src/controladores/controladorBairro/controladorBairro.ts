import { Request, Response } from "express-serve-static-core";
import { ControladorGeral } from "../ControladorGeral";
export class ControladorBairro extends ControladorGeral{
    private repositorio = this.repositorios.bairroRepositorio;
    private repositorioMunicipio = this.repositorios.municipioRepositorio;

    public async removerDado(requisicao: Request, resposta: Response ) {
        const deletarPeloId = parseInt(requisicao.params.idbairro);

        try{
            const codigo_bairro = await this.repositorio.findOne({where: {CODIGO_BAIRRO : deletarPeloId}});

            if(!codigo_bairro){
                return resposta.status(400).json({mensagem: 'Codigo do bairro não encontrado !'});
            }
            await this.repositorio.remove(codigo_bairro);

            return resposta.status(200).json({mensagem: 'Deleção completada'});

        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor: ' + erro});
        }
        
    }

    public async listarDado(requisicao: Request, resposta: Response) {
        try{
            const bairros = await this.repositorio.find();

            return resposta.status(200).json(bairros);
        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro});
        }
    }
    
    public async atualizarDado(requisicao: Request, resposta: Response ) {
        const { nome, status } = requisicao.body;
        const pegarIdBairro = parseInt(requisicao.params.idbairro);

        try{
            const codigo_bairro = await this.repositorio.findOne({where: {CODIGO_BAIRRO : pegarIdBairro}});
            const nome_bairro = await this.repositorio.findOne({where : {NOME: nome}});

            if(!codigo_bairro){
                return resposta.status(400).json({mensagem : 'Codigo do bairro não encontrado'});
            }
            if(nome){
                return resposta.status(400).json({mensagem: 'Bairro ja inserido'});
            }

            codigo_bairro.NOME =  nome   || codigo_bairro.NOME;
            codigo_bairro.STATUS=  status  || codigo_bairro.STATUS;

            const bairroAtualizado = await this.repositorio.save(codigo_bairro);

            return resposta.status(200).json({mensagem: bairroAtualizado});
            
        }catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro })
        }
    }

    public async adionarDado(requisicao: Request, resposta: Response) {
        const {codigo_municipio,nome, status} = requisicao.body;

        try{
            const codigo_municipio_ = await this.repositorioMunicipio.findOne({where: {CODIGO_MUNICIPIO: codigo_municipio}})
            if(!nome || !status){
                return resposta.status(400).json({mensagem: "Nome não encontrados !"});
            }
            else {
                const verificarUmNome = await this.repositorio.findOne({where : {NOME: nome} });

                if(verificarUmNome){
                    return resposta.status(400).json({mensagem: 'Nome já inserido no banco'});
                }

                if(!codigo_municipio_){
                    return resposta.status(400).json({mensagem: 'Codigo do municipio nao encontrado'});
                }

                const novoBairro = this.repositorio.create(
                    {
                        CODIGO_MUNICIPIO: codigo_municipio,
                        NOME: nome,
                        STATUS: status
                    }
                );
                await this.repositorio.save(novoBairro);
                return resposta.status(200).json(novoBairro);
            }
        }
        catch(erro){
            return resposta.status(400).json({mensagem :'Erro interno servidor:' + erro});
        }
    }
}