import { Request, Response } from "express-serve-static-core";
import { ControladorGeral } from "../ControladorGeral";
import { IRepositorios } from "../../Irepositorios/Irepositorios";

export class ControladorUf extends ControladorGeral{
    private repositorio: IRepositorios;

    constructor(repositorios: IRepositorios) {
        super();
        this.repositorio = repositorios;
    }

    public async atualizarDado(requisicao: Request, resposta: Response ) {
        const { sigla, nome, status } = requisicao.body;
        const pegarIdUf = parseInt(requisicao.params.iduf);   
        try{
            
            
            const codigo_UF = await this.repositorio.ufRepositorio.findOne({where: {codigoUF : pegarIdUf}});
            const sigla_UF = await this.repositorio.ufRepositorio.findOne({where: {sigla: sigla}});
            const nome_UF = await this.repositorio.ufRepositorio.findOne({where : {nome: nome}});

            if(!codigo_UF){
                return resposta.status(400).json({mensagem : 'Codigo Uf não encontrado'});
            }
            if(sigla_UF || nome_UF){
                return resposta.status(400).json({mensagem: 'Nome ou Sigla já inseridos'});
            }

            codigo_UF.sigla =  sigla   || codigo_UF.sigla;
            codigo_UF.nome  =  nome    || codigo_UF.nome;
            codigo_UF.status=  status  || codigo_UF.status;

            const ufAtualizado = await this.repositorio.ufRepositorio.save(codigo_UF);

            return resposta.status(200).json({mensagem: ufAtualizado});
            
        }catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro })
        }
    }
    
    public async removerDado(requisicao: Request, resposta: Response ) {
        const deletarPeloId = parseInt(requisicao.params.iduf);

        try{
            const codigo_Uf = await this.repositorio.ufRepositorio.findOne({where: {codigoUF : deletarPeloId}});

            if(!codigo_Uf){
                return resposta.status(400).json({mensagem: 'Codigo Uf não encontrado !'});
            }
            await this.repositorio.ufRepositorio.remove(codigo_Uf);

            return resposta.status(200).json({mensagem: 'Deleção completada'});

        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor: ' + erro});
        }
    }

    public async adionarDado(requisicao: Request, resposta: Response) {
        const {sigla, nome, status} = requisicao.body;
        
        try{

            if(!sigla || !nome || !status){
                return resposta.status(400).json({mensagem: "Sigla ou Nome ou Status não encontrados no Json !"});
            }
            else {
                const verificarUmNome = await this.repositorio.ufRepositorio.findOne({where : {nome: nome} });
                const vericarUmaSigla = await this.repositorio.ufRepositorio.findOne({where: {sigla: sigla}});

                if(verificarUmNome){
                    return resposta.status(400).json({mensagem: 'Nome já inserido no banco'});
                }
                if (vericarUmaSigla){
                    return resposta.status(400).json({mensagem: 'Sigla já inserida no banco de dados'});
                }
               
                const novoUf = this.repositorio.ufRepositorio.create(
                    {
                        sigla: sigla,
                        nome: nome,
                        status: status
                    }
                );
                await this.repositorio.ufRepositorio.save(novoUf);
                return resposta.status(200).json(novoUf);
            }
        }
        catch(erro){
            return resposta.status(500).json({mensagem: "Erro interno no servidor: " + erro});
        }
    }


    public async listarDado(requisicao: Request, resposta: Response ) {
        try{
            const municipios = await this.repositorio.ufRepositorio.find({
                relations: {
                    municipios: true
                }
            });
            return resposta.status(200).json(municipios);
        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro});
        }
    }

    //Verifica se a quantidade de siglas e valida
    private vericarQtdSiglas(Sigla: string): Boolean {
        if(Sigla.length > 2 || Sigla.length <= 0 || Sigla.length == 1){
            return false;
        }

        return true;
    }
}