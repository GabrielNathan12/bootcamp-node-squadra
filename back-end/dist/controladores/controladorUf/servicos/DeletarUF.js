"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletarUF = void 0;
class DeletarUF {
    constructor(repositorio) {
        this.repositorioUf = repositorio;
    }
    async deletarUF({ codigoUF }, resposta) {
        const ufRepositorio = this.repositorioUf.ufRepositorio;
        const ufExiste = await ufRepositorio.find({ where: { codigoUF: codigoUF } });
        if (!ufExiste) {
            return resposta.status(400).json({ mensagem: 'UF nao existe', status: '400' });
        }
        await ufRepositorio.remove(ufExiste);
        return resposta.status(200).json(await ufRepositorio.find({}));
    }
}
exports.DeletarUF = DeletarUF;
