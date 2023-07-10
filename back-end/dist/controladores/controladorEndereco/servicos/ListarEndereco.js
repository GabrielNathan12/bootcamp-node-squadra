"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListaEndereco = void 0;
class ListaEndereco {
    constructor(repositorio) {
        this.repositorios = repositorio;
    }
    async litaEndereco(requisicao, reposta) {
        const enderecoReposito = this.repositorios.enderecoRepositorio;
        const { codigoEndereco, nomeRua, numero, complemento, cep, status } = requisicao.query;
        if (codigoEndereco || nomeRua || numero || complemento || cep || status) {
            this.listaFiltrada({
                codigoEndereco: Number(codigoEndereco),
                nomeRua: nomeRua,
                numero: Number(numero),
                complemento: complemento,
                cep: cep,
                status: Number(status)
            }, requisicao, reposta);
        }
        else {
            return reposta.status(200).json(await enderecoReposito.find({ relations: { codigoBairro: true, codigoPessoa: true } }));
        }
    }
    async listaFiltrada({ codigoEndereco, nomeRua, numero, complemento, cep, status }, requisicao, resposta) {
        try {
            let filtarEnderecos = {};
            if (codigoEndereco) {
                filtarEnderecos.codigoEndereco = Number(codigoEndereco);
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
            if (status) {
                filtarEnderecos.status = Number(status);
            }
            const enderecoFiltrado = await this.repositorios.enderecoRepositorio.find({ where: filtarEnderecos });
            return resposta.status(200).json(enderecoFiltrado);
        }
        catch (error) {
            return resposta.status(400).json({ mensagem: 'Erro ao filtrar os enderecos', status: '400' + error });
        }
    }
}
exports.ListaEndereco = ListaEndereco;
