"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtualizarMunicipio = void 0;
class AtualizarMunicipio {
    constructor(repositorio) {
        this.repositorioMunicipio = repositorio;
    }
    async atualizarMunicipio({ codigoMunicipio, nome, status }, requisicao, resposta) {
        const municipioRepositorio = this.repositorioMunicipio.municipioRepositorio;
        const municipio = await municipioRepositorio.findOne({ where: { codigoMunicipio: codigoMunicipio } });
        if (!municipio) {
            return resposta.status(400).json({ mensagem: 'Municipio nao existe', status: '400' });
        }
        const municipioNome = await municipioRepositorio.findOne({ where: { nome: nome } });
        if (municipioNome && nome !== municipio.nome) {
            return resposta.status(400).json({ mensagem: 'Nome do municio ja existe', status: '400' });
        }
        municipio.nome = nome;
        municipio.status = status;
        await municipioRepositorio.save(municipio);
        return resposta.status(200).json(await municipioRepositorio.find({}));
    }
}
exports.AtualizarMunicipio = AtualizarMunicipio;
