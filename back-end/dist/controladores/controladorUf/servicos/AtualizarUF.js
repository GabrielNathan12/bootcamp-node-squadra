"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtualizarUF = void 0;
class AtualizarUF {
    constructor(repositorio) {
        this.repositorioUf = repositorio;
    }
    async atualizarUf({ codigoUF, nome, sigla, status }, requisicao, resposta) {
        const ufRepositorio = this.repositorioUf.ufRepositorio;
        const uf = await ufRepositorio.findOne({ where: { codigoUF: codigoUF } });
        if (!uf) {
            return resposta.status(400).json({ mensagem: 'UF nao existe', status: '400' });
        }
        const ufNome = await ufRepositorio.findOne({ where: { nome: nome } });
        if (ufNome && nome !== uf.nome) {
            return resposta.status(400).json({ mensagem: 'UF ja existe', status: '400' });
        }
        const ufSigla = await ufRepositorio.findOne({ where: { sigla: sigla } });
        if (ufSigla && sigla !== uf.sigla) {
            return resposta.status(400).json({ mensagem: 'Sigla ja existe', status: '400' });
        }
        uf.nome = nome;
        uf.sigla = sigla;
        uf.status = status;
        await ufRepositorio.save(uf);
        return resposta.status(200).json(await ufRepositorio.find({}));
    }
}
exports.AtualizarUF = AtualizarUF;
