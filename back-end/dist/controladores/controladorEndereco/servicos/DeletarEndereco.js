"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletarEndereco = void 0;
class DeletarEndereco {
    constructor(repositorio) {
        this.repositorios = repositorio;
    }
    async deletarEndereco({ codigoEndereco }, requisicao, resposta) {
        const enderecoReposito = this.repositorios.enderecoRepositorio;
        const enderecoExiste = await enderecoReposito.findOne({ where: { codigoEndereco: Number(codigoEndereco) } });
        if (!enderecoExiste) {
            return resposta.status(400).json({ mensagem: 'Endereco nao existe', status: '400' });
        }
        await enderecoReposito.remove(enderecoExiste);
        return resposta.status(200).json(await enderecoReposito.find({}));
    }
}
exports.DeletarEndereco = DeletarEndereco;
