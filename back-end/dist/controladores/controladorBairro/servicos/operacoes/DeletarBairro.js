"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletarBairro = void 0;
const Servicos_1 = require("../Servicos");
class DeletarBairro extends Servicos_1.Servicos {
    constructor(repositorio) {
        super(repositorio);
    }
    async deletarBairro({ codigoBairro }, requisicao, resposta) {
        const bairroRepositorio = this.obterRepositorio();
        const bairroExiste = await bairroRepositorio.find({ where: { codigoBairro: codigoBairro } });
        if (!bairroExiste) {
            return resposta.status(400).json({ mensagem: 'Bairro nao cadastrado', status: 400 });
        }
        await bairroRepositorio.remove(bairroExiste);
        const bairros = await bairroRepositorio.find({
            select: ["codigoBairro", "municipio", "nome", "status"],
            relations: ["municipio"]
        });
        const todosBairros = this.listarBairros(bairros);
        return resposta.status(200).json(todosBairros);
    }
}
exports.DeletarBairro = DeletarBairro;
