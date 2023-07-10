"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarBairro = void 0;
class CriarBairro {
    constructor(repositorio) {
        this.repositorios = repositorio;
    }
    async criarBairro({ codigoMunicipio, nome, status }, requisicao, resposta) {
        const repositorioBairro = this.repositorios.bairroRepositorio;
        const repositorioMunicipio = this.repositorios.municipioRepositorio;
        const municipioExiste = await repositorioMunicipio.findOne({ where: { codigoMunicipio: codigoMunicipio } });
        if (!municipioExiste) {
            return resposta.status(400).json({ mensagem: "Município não existe", status: "400" });
        }
        const bairroExiste = await repositorioBairro.createQueryBuilder("Bairro").where("Bairro.nome = :nome", { nome: nome })
            .andWhere("Bairro.codigoMunicipio = :codigoMunicipio", { codigoMunicipio: codigoMunicipio }).getOne();
        if (bairroExiste) {
            return resposta.status(400).json({ mensagem: "Bairro já existe", status: "400" });
        }
        const novoBairro = repositorioBairro.create({
            codigoMunicipio: { codigoMunicipio: codigoMunicipio },
            nome: nome,
            status: status,
        });
        await repositorioBairro.save(novoBairro);
        return resposta.status(200).json(await repositorioBairro.find({}));
    }
}
exports.CriarBairro = CriarBairro;
