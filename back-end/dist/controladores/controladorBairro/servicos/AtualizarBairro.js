"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtualizarBairro = void 0;
class AtualizarBairro {
    constructor(repositorio) {
        this.repositorios = repositorio;
    }
    async atualizarBairro({ codigoBairro, nome, status }, requisicao, resposta) {
        const repositorioBairro = this.repositorios.bairroRepositorio;
        const bairro = await repositorioBairro.findOne({ where: { codigoBairro: codigoBairro } });
        if (!bairro) {
            return resposta.status(400).json({ mensagem: 'Bairro nao existe', status: '400' });
        }
        const bairroNome = await repositorioBairro.findOne({ where: { nome: nome } });
        if (bairroNome && nome !== bairroNome.nome) {
            return resposta.status(400).json({ mensagem: 'Bairro ja existe', status: '400' });
        }
        bairro.nome = nome;
        bairro.status = status;
        await repositorioBairro.save(bairro);
        return resposta.status(200).json(await repositorioBairro.find({}));
    }
}
exports.AtualizarBairro = AtualizarBairro;
