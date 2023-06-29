import { ParamsDictionary, Request, Response } from "express-serve-static-core";
import { ControladorGeral } from "../ControladorGeral";
import { IRepositorios } from "../../Irepositorios/Irepositorios";
import { ParsedQs } from "qs";

export class ControladorMunicipio extends ControladorGeral{
    public listarDadosPeloNome(requisicao: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, resposta: Response<any, Record<string, any>, number>): Promise<Response<any, Record<string, any>, number>> {
        throw new Error("Method not implemented.");
    }
    private repositorio : IRepositorios;

    constructor(repositorios: IRepositorios){
        super();
        this.repositorio = repositorios;
    }

    public async removerDado(requisicao: Request, resposta: Response ) {
        const deletarPeloId = parseInt(requisicao.params.idmunicipio);

        try{
            const codigo_Municipio = await this.repositorio.municipioRepositorio.findOne({where: {codigoMunicipio : deletarPeloId}});

            if(!codigo_Municipio){
                return resposta.status(400).json({mensagem: 'Codigo do municipio não encontrado !'});
            }
            await this.repositorio.municipioRepositorio.remove(codigo_Municipio);

            return resposta.status(200).json({mensagem: 'Deleção completada', status: await this.repositorio.municipioRepositorio.find({})});

        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor: ' + erro});
        }
        
    }

    public async listarDado(requisicao: Request, resposta: Response) {
        try{
            const municipios = await this.repositorio.municipioRepositorio.find({
                relations: {
                    codigoUF: true,
                    bairros: true
                },
            });
            return resposta.status(200).json(municipios);
        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro});
        }
    }
    
    public async atualizarDado(requisicao: Request, resposta: Response ) {
        const {codigoMunicipio ,nome, status } = requisicao.body;
       
        try{
            const pegarIdMunicipio = Number(codigoMunicipio);
            const codigo_Municipio = await this.repositorio.municipioRepositorio.findOne({where: {codigoMunicipio : pegarIdMunicipio}});
            const nome_municipio = await this.repositorio.municipioRepositorio.findOne({where : {nome: nome}});

            if(!codigo_Municipio){
                return resposta.status(400).json({mensagem : 'Codigo do municipio não encontrado', status: '400'});
            }
            if(nome_municipio){
                return resposta.status(400).json({mensagem: 'Nome do municipio ja inserido', status: '400'});
            }
            if(!this.vericarStatus(Number(status))){
                return resposta.status(400).json({mensagem: 'Status invalido !', status: '400'});
            }


            codigo_Municipio.nome =  nome   || codigo_Municipio.nome;
            codigo_Municipio.status=  status  || codigo_Municipio.status;

            await this.repositorio.municipioRepositorio.save(codigo_Municipio);

            return resposta.status(200).json(await this.repositorio.municipioRepositorio.find());
            
        }catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro })
        }
    }

    public async adionarDado(requisicao: Request, resposta: Response) {
        const {codigoUF ,nome, status} = requisicao.body;

        try{

            const verificarCodigoUF = await this.repositorio.ufRepositorio.findOne({where: {codigoUF:codigoUF}});

            if(!nome || !status || !codigoUF){
                return resposta.status(400).json({mensagem: "Nome ou Status e Codigo_UF não encontrados no Json !", status: '400'});
            }
            else {
                const verificarUmNome = await this.repositorio.municipioRepositorio.findOne({where : {nome: nome} });

                if(!verificarCodigoUF){
                    return resposta.status(400).json({mensagem: 'Codigo Uf nao encontrado', status: '400'});
                }
                if(verificarUmNome){
                    return resposta.status(400).json({mensagem: 'Nome já inserido no banco', status: '400'});
                }
                if(!this.vericarStatus(Number(status))){
                    return resposta.status(400).json({mensagem: 'Status inválido', status:'400'})
                }

                const novoMunicipio = this.repositorio.municipioRepositorio.create(
                    {
                        codigoUF: codigoUF,
                        nome: nome,
                        status: status
                    }
                );
                await this.repositorio.municipioRepositorio.save(novoMunicipio);
                return resposta.status(200).json(await this.repositorio.municipioRepositorio.find({relations:{ codigoUF : true}}));
            }
        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro interno servidor',erro});
        }
    }
}