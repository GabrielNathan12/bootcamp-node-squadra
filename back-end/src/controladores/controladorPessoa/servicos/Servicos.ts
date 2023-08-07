import { IRepositorios } from "../../../Irepositorios/Irepositorios";
import { Pessoa } from "../../../entidades/Pessoa";
import { ErrosDaAplicacao } from "../../../errosAplicacao/ErrosDaAplicacao";

interface IPessoa {
    nome: string;
    sobrenome: string;
    idade: number;
    login: string;
    senha: string;
    status: number;
    enderecos?: IEndereco[];
}

interface IEndereco {
    codigoBairro: { codigoBairro: number };
    nomeRua: string;
    numero: number;
    complemento: string;
    cep: string;
    codigoPessoa?: { codigoPessoa: number };
}

export class Servicos{
    private repositorios: IRepositorios;

    constructor(repositorios: IRepositorios){
        this.repositorios = repositorios;
    }
    
    protected async validaTodosOsCampos({ nome, sobrenome, idade, login, senha, status }: IPessoa) {
        
        const repositorioPessoa = this.obterRepositorioPessoa();

        if(!nome) {
            throw new ErrosDaAplicacao('Campo nome nao encontrado',  400);
        }
        if(!sobrenome) {
            throw new ErrosDaAplicacao('Campo sobrenome nao encontrado' , 400);
        }
        if(!idade || isNaN(idade)) {
            throw new ErrosDaAplicacao('Idade nao e um numero',  400);
        }
        if(!login) {
            throw new ErrosDaAplicacao('Campo login nao encontrado', 400);
        }
        if(!senha) {
            throw new ErrosDaAplicacao('Campo senha nao encontrado',  400);
        }
        if(!status || isNaN(status) || !this.verificaStatusValido(Number(status))) {
            throw new ErrosDaAplicacao(`Status do campo invalido, valor do status: ${status}`,400);
        }

    }
    protected async validarCamposEndereco({codigoBairro,nomeRua,numero,complemento,cep}:IEndereco){

        if(!codigoBairro){
            throw new ErrosDaAplicacao('Codigo bairro nao encontrado', 400);
        }
        if(!nomeRua){
            throw new ErrosDaAplicacao('Codigo bairro nao encontrado', 400);
        }
        if(!numero){
            throw new ErrosDaAplicacao('Codigo bairro nao encontrado', 400);
        }
        if(!complemento){
            throw new ErrosDaAplicacao('Codigo bairro nao encontrado', 400);
        }
        if(!cep){
            throw new ErrosDaAplicacao('Codigo bairro nao encontrado', 400);
        }
    }
    protected obterRepositorioPessoa(){
        return this.repositorios.pessoaRepositorio;
    }

    protected obterRepositorioBairro(){
        return this.repositorios.bairroRepositorio;
    }

    protected obterRepositorioEndereco(){
        return this.repositorios.enderecoRepositorio;
    }
    protected verificaStatusValido(status: number) {
        return status === 1 || status === 2;
    }

    protected async listarTodosOsDados() {
        const pessoas = await this.repositorios.pessoaRepositorio.find({
            relations:['enderecos', 
            "enderecos.bairro",
            "enderecos.bairro.municipio",
            "enderecos.bairro.municipio.uf"]})
        return pessoas;
    }
    protected listarTodasPessoas(pessoas: Pessoa[]){

        return pessoas.map((pessoa) => ({
            codigoPessoa: pessoa.codigoPessoa,
            nome: pessoa.nome,
            sobrenome: pessoa.sobrenome,
            idade: pessoa.idade,
            login: pessoa.login,
            senha: pessoa.senha,
            status: pessoa.status,
            enderecos: []
        }));
    }
}