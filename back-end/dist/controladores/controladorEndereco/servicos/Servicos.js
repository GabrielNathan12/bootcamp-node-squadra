"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servicos = void 0;
class Servicos {
    constructor(repositorio) {
        this.repositorios = repositorio;
    }
    obterRepositorioEndereco() {
        return this.repositorios.enderecoRepositorio;
    }
    obterRepositorioPessoa() {
        return this.repositorios.pessoaRepositorio;
    }
    obterRepositorioBairro() {
        return this.repositorios.bairroRepositorio;
    }
    listarTodosEnderecos(enderecos) {
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
exports.Servicos = Servicos;
