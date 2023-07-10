"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtualizarEndereco = void 0;
class AtualizarEndereco {
    constructor(repositorio) {
        this.repositorios = repositorio;
    }
    async atualizarEndereco({ codigoEndereco, nomeRua, numero, complemento, cep, status }, requisicao, resposta) {
        const enderecoReposito = this.repositorios.enderecoRepositorio;
        const endereco = await enderecoReposito.findOne({ where: { codigoEndereco: codigoEndereco } });
        if (!endereco) {
            return resposta.status(400).json({ mensagem: 'Endereco nao encontrado', status: '400' });
        }
        endereco.nomeRua = nomeRua;
        endereco.numero = numero;
        endereco.complemento = complemento;
        endereco.cep = cep;
        endereco.status = status;
        await enderecoReposito.save(endereco);
        return resposta.status(200).json(await enderecoReposito.find({}));
    }
}
exports.AtualizarEndereco = AtualizarEndereco;
