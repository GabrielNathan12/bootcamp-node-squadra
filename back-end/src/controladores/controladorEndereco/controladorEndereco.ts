import { Request, Response } from "express-serve-static-core";
import { ControladorGeral } from "../ControladorGeral";
import { IRepositorios } from "../../Irepositorios/Irepositorios";

export class ControladorEndereco extends ControladorGeral{
    private repositorio: IRepositorios;

    constructor(repositorios: IRepositorios) {
        super();
        this.repositorio = repositorios;
    }
    
    public async removerDado(requisicao: Request, resposta: Response ) {
        const deletarPeloId = parseInt(requisicao.params.idendereco);

        try{
            const codigo_endero = await this.repositorio.enderecoRepositorio.findOne({where: {codigoEndereco : deletarPeloId}});

            if(!codigo_endero){
                return resposta.status(400).json({mensagem: 'Codigo da pessoa não encontrado !'});
            }
            await this.repositorio.enderecoRepositorio.remove(codigo_endero);

            return resposta.status(200).json({mensagem: 'Deleção completada'});

        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor: ' + erro});
        }
        
    }

    public async listarDado(requisicao: Request, resposta: Response) {
        try{
            const enderecos = await this.repositorio.enderecoRepositorio.find();

            return resposta.status(200).json([enderecos]);
        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro});
        }
    }
    
    public async atualizarDado(requisicao: Request, resposta: Response ) {
        const { codigo_pessoa, bairro, nome , numero, complemento, CEP, status } = requisicao.body;
        const pegarIdEndereco = parseInt(requisicao.params.idendereco);
        
        try{
            const codigo_endereco = await this.repositorio.enderecoRepositorio.findOne({where: {codigoEndereco : pegarIdEndereco}});

            if(!codigo_endereco){
                return resposta.status(400).json({mensagem : 'Codigo do enderco não encontrado'});
            }
            if(!this.vericarStatus(Number(status))){
                return resposta.status(400).json({mensagem: 'Status invalido !'});
            }


            codigo_endereco.pessoa =  codigo_pessoa   || codigo_endereco.pessoa;
            codigo_endereco.bairro = bairro || codigo_endereco.bairro;
            codigo_endereco.nomeRua = nome || codigo_endereco.nomeRua;
            codigo_endereco.nomeRua =  numero  || codigo_endereco.numero;
            codigo_endereco.complemento = complemento || codigo_endereco.complemento;
            codigo_endereco.cep = CEP || codigo_endereco.cep;
            codigo_endereco.status = status || codigo_endereco.status;

            const enderecoAtualizada = await this.repositorio.enderecoRepositorio.save(codigo_endereco);

            return resposta.status(200).json({mensagem: enderecoAtualizada});
            
        }catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro })
        }
    }

    public async adionarDado(requisicao: Request, resposta: Response) {
        const { codigo_pessoa, nome_bairro ,nome_rua, numero,complemento ,CEP , status } = requisicao.body;

        try{

            const verificaCodPessoa = await this.repositorio.pessoaRepositorio.findOne({where: {codigoPessoa: codigo_pessoa}});
            const vericaCodBairro = await this.repositorio.bairroRepositorio.findOne({where: {nome: nome_bairro}});

            if(!nome_rua || !status || !CEP || !complemento || !codigo_pessoa || !nome_bairro || !numero){
                return resposta.status(400).json({mensagem: "Dados nao encontrados !"});
            }
            else {

                if(!verificaCodPessoa || !vericaCodBairro){
                    return resposta.status(400).json({mensagem: "Nome da Pessoa nao encontrado!"});
                }
                const novoEndereco = this.repositorio.enderecoRepositorio.create(
                    {  
                        pessoa: codigo_pessoa,
                        bairro: nome_bairro,
                        nomeRua: nome_rua,
                        numero: numero,
                        complemento: complemento,
                        status: status
                    }
                );
                await this.repositorio.enderecoRepositorio.save(novoEndereco);
                return resposta.status(200).json(novoEndereco);
            }
        }
        catch(erro){
            return resposta.status(500).json();
        }
    }
}