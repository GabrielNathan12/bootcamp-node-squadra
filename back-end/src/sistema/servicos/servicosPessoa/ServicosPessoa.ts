import { pessoaRepositorio } from "../../../banco_de_dados/repositorios/pessoaRepositorio";
import { IPessoa } from "../../vo/IPessoa";
import * as bcrypt from 'bcryptjs';

export class ServicosPessoas{
    public async criarNovaPessoa(pessoa: IPessoa){

        const hash = await bcrypt.hash(pessoa.senha, 10);

        const respositorio = pessoaRepositorio;
        const novaPessoa = respositorio.create({nome: pessoa.nome, sobrenome: pessoa.sobrenome,
                                                      idade: pessoa.idade, login: pessoa.login,
                                                      senha: hash, status: pessoa.status});
            
        await respositorio.save(novaPessoa);

        const idPessoa = novaPessoa.codigoPessoa;
        
        return idPessoa;
    }


    public async listarPessoas(){
        const repositorio = pessoaRepositorio;
        
        const listaPessoas = await repositorio.find({
            relations: ['enderecos', 'enderecos.bairro', 'enderecos.bairro.municipio', 'enderecos.bairro.municipio.uf']
        });

        return listaPessoas;
    }
}