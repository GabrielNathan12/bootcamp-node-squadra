import { IRepositorios } from "../../../Irepositorios/Irepositorios";
import { Endereco } from "../../../entidades/Endereco";


export class Servicos{
    private repositorios: IRepositorios;
    
    constructor(repositorio:IRepositorios){
        this.repositorios = repositorio;
    }

    protected obterRepositorioEndereco(){
        return this.repositorios.enderecoRepositorio;
    }
    protected obterRepositorioPessoa(){
        return this.repositorios.pessoaRepositorio;
    }
    protected obterRepositorioBairro(){
        return this.repositorios.bairroRepositorio;
    }
    
    protected listarTodosEnderecos(enderecos: Endereco[]){

        return enderecos.map((endereco) => ({
            codigoEndereco: endereco.codigoEndereco,
            codigoPessoa: endereco.pessoa,
            codigoBairro: endereco.bairro.codigoBairro,
            nomeRua: endereco.nomeRua,
            numero: endereco.numero,
            complemento: endereco.complemento,
            cep: endereco.cep,
        }));
    }
}