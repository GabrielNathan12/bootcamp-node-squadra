"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletarMunicipio = void 0;
const Servicos_1 = require("../Servicos");
class DeletarMunicipio extends Servicos_1.Servicos {
    constructor(repositorio) {
        super(repositorio);
    }
    async deletarMunicipio({ codigoMunicipio }, requisicao, resposta) {
        const municipioRepositorio = this.obterRepositorioMunicipio();
        const municipioExiste = await municipioRepositorio.find({ where: { codigoMunicipio: codigoMunicipio } });
        if (!municipioExiste) {
            return resposta.status(400).json({ mensagem: 'Municipio nao cadastrado', status: 400 });
        }
        await municipioRepositorio.remove(municipioExiste);
        const municipios = await this.obterRepositorioMunicipio().find({
            select: ["codigoMunicipio", "nome", "status", "uf"],
            relations: ["uf"]
        });
        const todosMunicipios = this.listarMunicipios(municipios);
        return resposta.status(200).json(todosMunicipios);
    }
}
exports.DeletarMunicipio = DeletarMunicipio;
