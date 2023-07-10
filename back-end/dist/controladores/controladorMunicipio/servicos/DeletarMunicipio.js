"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletarMunicipio = void 0;
class DeletarMunicipio {
    constructor(repositorio) {
        this.repositorioMunicipio = repositorio;
    }
    async deletarMunicipio({ codigoMunicipio }, requisicao, resposta) {
        const municipioRepositorio = this.repositorioMunicipio.municipioRepositorio;
        const municipioExiste = await municipioRepositorio.find({ where: { codigoMunicipio: codigoMunicipio } });
        if (!municipioExiste) {
            return resposta.status(400).json({ mensagem: 'Municipio nao existe', status: '400' });
        }
        await municipioRepositorio.remove(municipioExiste);
        return resposta.status(200).json(await municipioRepositorio.find({}));
    }
}
exports.DeletarMunicipio = DeletarMunicipio;
