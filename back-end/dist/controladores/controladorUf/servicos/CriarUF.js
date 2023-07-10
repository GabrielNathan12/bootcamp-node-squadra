"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarUF = void 0;
class CriarUF {
    constructor(repositorio) {
        this.repositorioUf = repositorio;
    }
    async criarNovoUF({ nome, sigla, status }, requisicao, resposta) {
        const ufRepositorio = this.repositorioUf.ufRepositorio;
        const ufExiste = await ufRepositorio.findOne({ where: { nome: nome } });
        const siglaExiste = await ufRepositorio.findOne({ where: { sigla: sigla } });
        if (ufExiste) {
            return resposta.status(400).json({ mensagem: 'UF ja existe', status: '400' });
        }
        if (siglaExiste) {
            return resposta.status(400).json({ mensagem: 'Sigla ja existe', status: '400' });
        }
        const novoUf = ufRepositorio.create({
            nome: nome, sigla: sigla, status: status
        });
        await ufRepositorio.save(novoUf);
        return resposta.status(200).json(await ufRepositorio.find({}));
    }
}
exports.CriarUF = CriarUF;
