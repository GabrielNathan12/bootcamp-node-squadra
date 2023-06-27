import { Request, Response } from "express-serve-static-core";
import { ControladorGeral } from "../ControladorGeral";
import { IRepositorios } from "../../Irepositorios/Irepositorios";

export class ControladorPessoa extends ControladorGeral{
    private repositorio: IRepositorios;

    constructor(repositorios: IRepositorios) {
        super();
        this.repositorio = repositorios;
    }

    public async removerDado(requisicao: Request, resposta: Response ) {
        const deletarPeloId = parseInt(requisicao.params.idpessoa);

        try{
            const codigo_pessoa = await this.repositorio.pessoaRepositorio.findOne({where: {codigoPessoa : deletarPeloId}});

            if(!codigo_pessoa){
                return resposta.status(400).json({mensagem: 'Codigo da pessoa não encontrado !'});
            }
            await this.repositorio.pessoaRepositorio.remove(codigo_pessoa);

            return resposta.status(200).json({mensagem: 'Deleção completada'});

        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor: ' + erro});
        }
        
    }

    public async listarDado(requisicao: Request, resposta: Response) {
        try{
            const pessoas = await this.repositorio.pessoaRepositorio.find({relations: {enderecos: true}});

            return resposta.status(200).json(pessoas);
        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro});
        }
    }
    
    public async atualizarDado(requisicao: Request, resposta: Response ) {
        const { nome, sobrenome, idade, data_nasc, senha, login, status } = requisicao.body;
        const pegarIdPessoa = parseInt(requisicao.params.idpessoa);

        try{
            const codigo_pessoa = await this.repositorio.pessoaRepositorio.findOne({where: {codigoPessoa : pegarIdPessoa}});

            if(!codigo_pessoa){
                return resposta.status(400).json({mensagem : 'Codigo do bairro não encontrado'});
            }
            if(!this.vericarStatus(Number(status))){
                return resposta.status(400).json({mensagem: 'Status invalido !'});
            }


            codigo_pessoa.nome =  nome   || codigo_pessoa.nome;
            codigo_pessoa.sobrenome = sobrenome || codigo_pessoa.sobrenome;
            codigo_pessoa.idade = idade || codigo_pessoa.idade;
            codigo_pessoa.senha = senha || codigo_pessoa.senha;
            codigo_pessoa.login = login || codigo_pessoa.login;
            codigo_pessoa.status=  status  || codigo_pessoa.status;

            const pessoaAtualizada = await this.repositorio.pessoaRepositorio.save(codigo_pessoa);

            return resposta.status(200).json({mensagem: pessoaAtualizada});
            
        }catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro })
        }
    }

    public async adionarDado(requisicao: Request, resposta: Response) {
        const {  nome, sobrenome, idade, data_nasc, senha, login, status} = requisicao.body;

        try{
            if(!nome || !status || !idade || !sobrenome || !data_nasc || !login || !senha){
                
                return resposta.status(400).json({mensagem: "Nome não encontrados !"});
            }
            else {

                const novaPessoa = this.repositorio.pessoaRepositorio.create(
                    {
                        nome: nome,
                        sobrenome: sobrenome,
                        idade: idade,
                        login: login,
                        senha: senha,
                        status: status
                    }
                );
                await this.repositorio.pessoaRepositorio.save(novaPessoa);
                return resposta.status(200).json(novaPessoa);
            }
        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro interno no servidor' + erro});
        }
    }
}