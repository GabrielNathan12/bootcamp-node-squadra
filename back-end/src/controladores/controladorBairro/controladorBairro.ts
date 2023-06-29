import { ParamsDictionary, Request, Response } from "express-serve-static-core";
import { ControladorGeral } from "../ControladorGeral";
import { IRepositorios } from "../../Irepositorios/Irepositorios";
import { ParsedQs } from "qs";
export class ControladorBairro extends ControladorGeral{
    public listarDadosPeloNome(requisicao: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, resposta: Response<any, Record<string, any>, number>): Promise<Response<any, Record<string, any>, number>> {
        throw new Error("Method not implemented.");
    }
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
                return resposta.status(400).json({mensagem: 'Codigo do bairro não encontrado !', status: '400'});
            }
            await this.repositorio.bairroRepositorio.remove(codigo_bairro);

            return resposta.status(200).json({mensagem: 'Deleção completada', status: await this.repositorio.bairroRepositorio.find()});

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
        const {codigoBairro ,nome, status } = requisicao.body;

        try{
            const pegarIdBairro = Number(codigoBairro);
            const codigo_bairro = await this.repositorio.bairroRepositorio.findOne({where: {codigoBairro : pegarIdBairro}});
            const nome_bairro = await this.repositorio.bairroRepositorio.findOne({where : {nome: nome}});

            if(!codigo_bairro){
                return resposta.status(400).json({mensagem : 'Codigo do bairro não encontrado', status: '400'});
            }
            if(nome_bairro){
                return resposta.status(400).json({mensagem: 'Bairro ja inserido', status: '400'});
            }
            if(!this.vericarStatus(Number(status))){
                return resposta.status(400).json({mensagem: 'Status inválido', status:'400'})
            }

            codigo_bairro.nome =  nome   || codigo_bairro.nome;
            codigo_bairro.status=  status  || codigo_bairro.status;

            await this.repositorio.bairroRepositorio.save(codigo_bairro);

            return resposta.status(200).json(this.repositorio.bairroRepositorio.find({}));
            
        }catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro })
        }
    }

    public async adionarDado(requisicao: Request, resposta: Response) {
        const {codigoMunicipio,nome, status} = requisicao.body;

        try{
            const codigo_municipio_ = await this.repositorio.municipioRepositorio.findOne({where: {codigoMunicipio: codigoMunicipio}})
            if(!nome || !status){
                return resposta.status(400).json({mensagem: "Nome não encontrados !"});
            }
            else {
                const verificarUmNome = await this.repositorio.bairroRepositorio.findOne({where : {nome: nome} });

                if(verificarUmNome){
                    return resposta.status(400).json({mensagem: 'Nome já inserido no banco', status: '400'});
                }

                if(!codigo_municipio_){
                    return resposta.status(400).json({mensagem: 'Codigo do municipio nao encontrado', status: '400'});
                }
                if(!this.vericarStatus(Number(status))){
                    return resposta.status(400).json({mensagem: 'Status inválido', status:'400'})
                }

                const novoBairro = this.repositorio.bairroRepositorio.create(
                    {
                        codigoMunicipio: codigoMunicipio,
                        nome: nome,
                        status: status
                    }
                );
                await this.repositorio.bairroRepositorio.save(novoBairro);
                return resposta.status(200).json(this.repositorio.bairroRepositorio.find({}));
            }
        }
        catch(erro){
            return resposta.status(400).json({mensagem :'Erro interno servidor:' + erro});
        }
    }
}