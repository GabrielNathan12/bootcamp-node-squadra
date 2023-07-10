"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletarBairro = void 0;
class DeletarBairro {
    constructor(repositorio) {
        this.repositorios = repositorio;
    }
    async deletarBairro({ codigoBairro }, requisicao, resposta) {
        const bairroRepositorio = this.repositorios.bairroRepositorio;
        const bairroExiste = await bairroRepositorio.find({ where: { codigoBairro: codigoBairro } });
        if (!bairroExiste) {
            return resposta.status(400).json({ mensagem: 'Municipio nao existe', status: '400' });
        }
        await bairroRepositorio.remove(bairroExiste);
        return resposta.status(200).json(await bairroRepositorio.find({}));
    }
}
exports.DeletarBairro = DeletarBairro;
