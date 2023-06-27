import { Request, Response } from "express-serve-static-core";
import { ControladorGeral } from "../ControladorGeral";
import { IRepositorios } from "../../Irepositorios/Irepositorios";

export class ControladorMunicipio extends ControladorGeral{
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

            return resposta.status(200).json({mensagem: 'Deleção completada'});

        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor: ' + erro});
        }
        
    }

    public async listarDado(requisicao: Request, resposta: Response) {
        try{
            const municipios = await this.repositorio.municipioRepositorio.find({
                relations: {
                    bairros: true
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
            const codigo_Municipio = await this.repositorio.municipioRepositorio.findOne({where: {codigoMunicipio : pegarIdMunicipio}});
            const nome_municipio = await this.repositorio.municipioRepositorio.findOne({where : {nome: nome}});

            if(!codigo_Municipio){
                return resposta.status(400).json({mensagem : 'Codigo do municipio não encontrado'});
            }
            if(nome_municipio){
                return resposta.status(400).json({mensagem: 'Nome do municipio ja inserido'});
            }
            if(!this.vericarStatus(Number(status))){
                return resposta.status(400).json({mensagem: 'Status invalido !'});
            }


            codigo_Municipio.nome =  nome   || codigo_Municipio.nome;
            codigo_Municipio.status=  status  || codigo_Municipio.status;

            const municipioAtualizado = await this.repositorio.municipioRepositorio.save(codigo_Municipio);

            return resposta.status(200).json({mensagem: municipioAtualizado});
            
        }catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro })
        }
    }

    public async adionarDado(requisicao: Request, resposta: Response) {
        const {codigo_uf ,nome, status} = requisicao.body;

        try{

            const verificarCodigoUF = await this.repositorio.ufRepositorio.findOne({where: {codigoUF:codigo_uf}});

            if(!nome || !status || !codigo_uf){
                return resposta.status(400).json({mensagem: "Nome ou Status e Codigo_UF não encontrados no Json !"});
            }
            else {
                const verificarUmNome = await this.repositorio.municipioRepositorio.findOne({where : {nome: nome} });

                if(!verificarCodigoUF){
                    return resposta.status(400).json({mensagem: 'Codigo Uf nao encontrado'});
                }
                if(verificarUmNome){
                    return resposta.status(400).json({mensagem: 'Nome já inserido no banco'});
                }

                const novoMunicipio = this.repositorio.municipioRepositorio.create(
                    {
                        codigoUF: codigo_uf,
                        nome: nome,
                        status: status
                    }
                );
                await this.repositorio.municipioRepositorio.save(novoMunicipio);
                return resposta.status(200).json(novoMunicipio);
            }
        }
        catch(erro){
            return resposta.status(200).json();
        }
    }
}