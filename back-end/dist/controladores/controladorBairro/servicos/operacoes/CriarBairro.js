"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarBairro = void 0;
const ErrosDaAplicacao_1 = require("../../../../errosAplicacao/ErrosDaAplicacao");
const Servicos_1 = require("../Servicos");
class CriarBairro extends Servicos_1.Servicos {
    constructor(repositorio) {
        super(repositorio);
    }
    async criarBairro({ codigoMunicipio, nome, status }, requisicao, resposta) {
        try {
            const repositorioBairro = this.obterRepositorio();
            await this.validarTodosOsCampus({ codigoMunicipio, nome, status });
            const novoBairro = repositorioBairro.create({
                municipio: { codigoMunicipio: codigoMunicipio },
                nome: nome,
                status: status,
            });
            await repositorioBairro.save(novoBairro);
            const bairros = await repositorioBairro.find({
                select: ["codigoBairro", "municipio", "nome", "status"],
                relations: ["municipio"]
            });
            const todosBairros = this.listarBairros(bairros);
            return resposta.status(200).json(todosBairros);
        }
        catch (error) {
            if (error instanceof ErrosDaAplicacao_1.ErrosDaAplicacao) {
                return resposta.status(error.status).json({ mensagem: error.message, status: error.status });
            }
            else {
                return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error });
            }
        }
    }
}
exports.CriarBairro = CriarBairro;
