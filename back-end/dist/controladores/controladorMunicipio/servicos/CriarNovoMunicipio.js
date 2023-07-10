"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarMunicipio = void 0;
class CriarMunicipio {
    constructor(repositorio) {
        this.repositorioMunicipio = repositorio;
    }
    async criarNovoMunicipio({ codigoUF, nome, status }, requisicao, resposta) {
        const repositorio = this.repositorioMunicipio.municipioRepositorio;
        const repositorioUF = this.repositorioMunicipio.ufRepositorio;
        const ufExiste = await repositorioUF.findOne({ where: { codigoUF: codigoUF } });
        const municipioExiste = await repositorio.createQueryBuilder("Municipio").where("Municipio.nome = :nome", { nome: nome })
            .andWhere("Municipio.codigoUF = :codigoUF", { codigoUF: codigoUF })
            .getOne();
        if (!ufExiste) {
            return resposta.status(400).json({ mensagem: 'Codigo Uf nao existe', status: '400' });
        }
        if (municipioExiste) {
            return resposta.status(400).json({ mensagem: 'Municipio ja existe', status: '400' });
        }
        const novoMuncipio = repositorio.create({
            codigoUF: { codigoUF: codigoUF }, nome: nome, status: status
        });
        await repositorio.save(novoMuncipio);
        return resposta.status(200).json(await repositorio.find({ relations: { codigoUF: true } }));
    }
}
exports.CriarMunicipio = CriarMunicipio;
