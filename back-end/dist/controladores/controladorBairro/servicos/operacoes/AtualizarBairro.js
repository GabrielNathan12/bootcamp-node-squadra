"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtualizarBairro = void 0;
const ErrosDaAplicacao_1 = require("../../../../errosAplicacao/ErrosDaAplicacao");
const Servicos_1 = require("../Servicos");
class AtualizarBairro extends Servicos_1.Servicos {
    constructor(repositorio) {
        super(repositorio);
    }
    async validaTodosOsCampus({ codigoBairro, codigoMunicipio, nome, status }) {
        if (!codigoBairro || isNaN(codigoBairro)) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao(`Campo codigoBairro inválido: ${codigoBairro}`, 400);
        }
        if (!codigoMunicipio || isNaN(codigoMunicipio)) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao(`Campo codigoMunicipio inválido: ${codigoMunicipio}`, 400);
        }
        if (!nome) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Campo nome não encontrado', 400);
        }
        if (!status || isNaN(status) || !this.verificaStatusValido(status)) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao(`Status do campo inválido: Motivo = ${status}`, 400);
        }
        const repositorioBairro = this.obterRepositorio();
        const repositorioMunicipio = this.obterRepositorioMunicipio();
        const bairro = await repositorioBairro.findOne({ where: { codigoBairro: codigoBairro } });
        if (!bairro) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Bairro não cadastrado', 400);
        }
        const municipioExiste = await repositorioMunicipio.findOne({ where: { codigoMunicipio: codigoMunicipio } });
        if (!municipioExiste) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('codigoMunicipio não encontrado no Banco de Dados', 400);
        }
        const bairroExiste = await repositorioBairro.findOne({
            where: { nome: nome, codigoMunicipio: codigoMunicipio }
        });
        if (bairroExiste && bairroExiste.codigoBairro !== codigoMunicipio) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Bairro já cadastrado nesse Municipio', 400);
        }
        bairro.municipio = municipioExiste;
        bairro.nome = nome;
        bairro.status = status;
        try {
            await repositorioBairro.save(bairro);
        }
        catch (error) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Erro ao salvar as alterações no banco de dados', 500);
        }
    }
    async atualizarBairro({ codigoBairro, codigoMunicipio, nome, status }, requisicao, resposta) {
        try {
            await this.validaTodosOsCampus({ codigoBairro, codigoMunicipio, nome, status });
            const bairroRepositorio = this.obterRepositorio();
            const bairros = await bairroRepositorio.find({
                select: ["codigoBairro", "nome", "status", "municipio"],
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
exports.AtualizarBairro = AtualizarBairro;
