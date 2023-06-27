import { Request, Response } from "express-serve-static-core";
import { ControladorGeral } from "../ControladorGeral";
import { IRepositorios } from "../../Irepositorios/Irepositorios";
export class ControladorBairro extends ControladorGeral{
    private repositorio: IRepositorios;
    
    constructor(repositorios: IRepositorios){
        super();
        this.repositorio = repositorios;
    }

    public async removerDado(requisicao: Request, resposta: Response ) {
        const deletarPeloId = parseInt(requisicao.params.idbairro);

        try{
            const codigo_bairro = await this.repositorio.bairroRepositorio.findOne({where: {codigoBairro : deletarPeloId}});

            if(!codigo_bairro){
                return resposta.status(400).json({mensagem: 'Codigo do bairro não encontrado !'});
            }
            await this.repositorio.bairroRepositorio.remove(codigo_bairro);

            return resposta.status(200).json({mensagem: 'Deleção completada'});

        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor: ' + erro});
        }
        
    }

    public async listarDado(requisicao: Request, resposta: Response) {
        try{
            const bairros = await this.repositorio.bairroRepositorio.find();

            return resposta.status(200).json([bairros]);
        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro});
        }
    }
    
    public async atualizarDado(requisicao: Request, resposta: Response ) {
        const { nome, status } = requisicao.body;
        const pegarIdBairro = parseInt(requisicao.params.idbairro);

        try{
            const codigo_bairro = await this.repositorio.bairroRepositorio.findOne({where: {codigoBairro : pegarIdBairro}});
            const nome_bairro = await this.repositorio.bairroRepositorio.findOne({where : {nome: nome}});

            if(!codigo_bairro){
                return resposta.status(400).json({mensagem : 'Codigo do bairro não encontrado'});
            }
            if(nome_bairro){
                return resposta.status(400).json({mensagem: 'Bairro ja inserido'});
            }

            codigo_bairro.nome =  nome   || codigo_bairro.nome;
            codigo_bairro.status=  status  || codigo_bairro.status;

            const bairroAtualizado = await this.repositorio.bairroRepositorio.save(codigo_bairro);

            return resposta.status(200).json({mensagem: bairroAtualizado});
            
        }catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro })
        }
    }

    public async adionarDado(requisicao: Request, resposta: Response) {
        const {codigo_municipio,nome, status} = requisicao.body;

        try{
            const codigo_municipio_ = await this.repositorio.municipioRepositorio.findOne({where: {codigoMunicipio: codigo_municipio}})
            if(!nome || !status){
                return resposta.status(400).json({mensagem: "Nome não encontrados !"});
            }
            else {
                const verificarUmNome = await this.repositorio.bairroRepositorio.findOne({where : {nome: nome} });

                if(verificarUmNome){
                    return resposta.status(400).json({mensagem: 'Nome já inserido no banco'});
                }

                if(!codigo_municipio_){
                    return resposta.status(400).json({mensagem: 'Codigo do municipio nao encontrado'});
                }

                const novoBairro = this.repositorio.bairroRepositorio.create(
                    {
                        codigoMunicipio: codigo_municipio,
                        nome: nome,
                        status: status
                    }
                );
                await this.repositorio.bairroRepositorio.save(novoBairro);
                return resposta.status(200).json(novoBairro);
            }
        }
        catch(erro){
            return resposta.status(400).json({mensagem :'Erro interno servidor:' + erro});
        }
    }
}