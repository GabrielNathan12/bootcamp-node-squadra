"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletarUF = void 0;
const Servicos_1 = require("../Servicos");
const ErrosDaAplicacao_1 = require("../../../../errosAplicacao/ErrosDaAplicacao");
class DeletarUF extends Servicos_1.Servicos {
    constructor(repositorio) {
        super(repositorio);
    }
    async deletarUF({ codigoUF }, resposta) {
        const ufExiste = await this.obterRepositorioUF().find({ where: { codigoUF: codigoUF } });
        if (!ufExiste) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('codigoUF nao existe no Banco de Dados', 400);
        }
        await this.obterRepositorioUF().remove(ufExiste);
        return resposta.status(200).json(await this.listarUfs());
    }
}
exports.DeletarUF = DeletarUF;
