import { Request, Response } from "express-serve-static-core";
import { ControladorGeral } from "../ControladorGeral";
import { bairroRepositorio } from "../../repositorios/bairroRepositorio";
import { pessoaRepositorio } from "../../repositorios/pessoaRepositorio";

export class ControladorPessoa extends ControladorGeral{
    
    public async removerDado(requisicao: Request, resposta: Response ) {
        const deletarPeloId = parseInt(requisicao.params.idpessoa);

        try{
            const codigo_pessoa = await pessoaRepositorio.findOne({where: {Codigo_Pessoa : deletarPeloId}});

            if(!codigo_pessoa){
                return resposta.status(400).json({mensagem: 'Codigo da pessoa não encontrado !'});
            }
            await pessoaRepositorio.remove(codigo_pessoa);

            return resposta.status(200).json({mensagem: 'Deleção completada'});

        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor: ' + erro});
        }
        
    }

    public async listarDado(requisicao: Request, resposta: Response) {
        try{
            const pessoas = await pessoaRepositorio.find({relations: {
                Enderecos: true
            }});

            return resposta.status(200).json(pessoas);
        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro});
        }
    }
    
    public async atualizarDado(requisicao: Request, resposta: Response ) {
        const { Nome, Status } = requisicao.body;
        const pegarIdPessoa = parseInt(requisicao.params.idpessoa);

        try{
            const codigo_pessoa = await pessoaRepositorio.findOne({where: {Codigo_Pessoa : pegarIdPessoa}});

            if(!codigo_pessoa){
                return resposta.status(400).json({mensagem : 'Codigo do bairro não encontrado'});
            }
            if(!this.vericarStatus(Number(Status))){
                return resposta.status(400).json({mensagem: 'Status invalido !'});
            }


            codigo_pessoa.Nome_Pessoa =  Nome   || codigo_pessoa.Nome_Pessoa;
            codigo_pessoa.Status=  Status  || codigo_pessoa.Status;

            const pessoaAtualizada = await pessoaRepositorio.save(codigo_pessoa);

            return resposta.status(200).json({mensagem: pessoaAtualizada});
            
        }catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro })
        }
    }

    public async adionarDado(requisicao: Request, resposta: Response) {
        const {Nome, Status, Idade, Sobrenome, DataNasc, Login, Senha} = requisicao.body;

        try{

            if(!Nome || !Status || !Idade || !Sobrenome || !DataNasc || !Login || !Senha){
                return resposta.status(400).json({mensagem: "Nome não encontrados !"});
            }
            else {

                if(!this.vericarStatus(Number(Status))){
                    return resposta.status(400).json({mensagem: 'Status invalido'});
                }
                const navaPessoa = pessoaRepositorio.create(
                    {
                        Nome_Pessoa: Nome,
                        Sobrenome: Sobrenome,
                        Data_Nasc: DataNasc,
                        Idade: Idade,
                        Login: Login,
                        Senha: Senha,
                        Status: Status
                    }
                );
                await bairroRepositorio.save(navaPessoa);
                return resposta.status(200).json(navaPessoa);
            }
        }
        catch(erro){
            return resposta.status(200).json();
        }
    }
}