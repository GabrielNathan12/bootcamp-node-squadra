"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListaEndereco = void 0;
const Servicos_1 = require("../Servicos");
class ListaEndereco extends Servicos_1.Servicos {
    constructor(repositorio) {
        super(repositorio);
    }
    async litaEndereco(requisicao, resposta) {
        const enderecoReposito = this.obterRepositorioEndereco();
        const { codigoEndereco, codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep } = requisicao.query;
        if (codigoEndereco || codigoPessoa || codigoBairro || nomeRua || numero || complemento || cep) {
            this.listaFiltrada({
                codigoEndereco: Number(codigoEndereco), codigoPessoa: Number(codigoPessoa),
                codigoBairro: Number(codigoBairro), nomeRua: nomeRua, numero: Number(numero), complemento: complemento,
                cep: cep
            }, requisicao, resposta);
        }
        else {
            try {
                const enderecos = await enderecoReposito.find({
                    select: ["codigoEndereco", "pessoa", "bairro", "nomeRua", "numero", "complemento", "cep"],
                    relations: ["pessoa", "bairro"]
                });
                const todosEnderecos = this.listarTodosEnderecos(enderecos);
                return resposta.status(200).json(todosEnderecos);
            }
            catch (error) {
                return resposta.status(400).json({ mensagem: "Erro ao listar os municipios", error });
            }
        }
    }
    async listaFiltrada({ codigoEndereco, codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep }, requisicao, resposta) {
        try {
            let filtarEnderecos = {};
            if (codigoEndereco) {
                filtarEnderecos.codigoEndereco = Number(codigoEndereco);
            }
            if (codigoPessoa) {
                filtarEnderecos.codigoPessoa = Number(codigoPessoa);
            }
            if (codigoBairro) {
                filtarEnderecos.codigoBairro = Number(codigoBairro);
            }
            if (nomeRua) {
                filtarEnderecos.nomeRua = nomeRua;
            }
            if (numero) {
                filtarEnderecos.numero = Number(numero);
            }
            if (complemento) {
                filtarEnderecos.complemento = complemento;
            }
            if (cep) {
                filtarEnderecos.cep = cep;
            }
            const enderecos = await this.obterRepositorioEndereco().find({
                where: filtarEnderecos,
                select: ["codigoEndereco", "pessoa", "bairro", "nomeRua", "numero", "complemento", "cep"],
                relations: ["pessoa", "bairro"]
            });
            const todosEnderecos = this.listarTodosEnderecos(enderecos);
            return resposta.status(200).json(todosEnderecos);
        }
        catch (error) {
            return resposta.status(400).json({ mensagem: 'Erro ao filtrar os enderecos', status: '400' + error });
        }
    }
}
exports.ListaEndereco = ListaEndereco;
