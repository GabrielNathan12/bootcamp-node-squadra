"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarBairro = void 0;
const Servicos_1 = require("../Servicos");
class ListarBairro extends Servicos_1.Servicos {
    constructor(repositorio) {
        super(repositorio);
    }
    async listarBairro(requisicao, resposta) {
        const repositorioBairro = this.obterRepositorio();
        const { codigoBairro, codigoMunicipio, nome, status } = requisicao.query;
        if (codigoBairro || codigoMunicipio || nome || status) {
            if (!Number(status) || (Number(status) !== 1 && Number(status) !== 2)) {
                if (status !== undefined) {
                    return resposta.status(400).json({ mensagem: `Status invalido na busca, valor = ${status}`, status: 400 });
                }
            }
            this.listaFiltrada({ codigoBairro: Number(codigoBairro), codigoMunicipio: Number(codigoMunicipio),
                nome: nome, status: Number(status) }, requisicao, resposta);
        }
        else {
            try {
                const bairros = await repositorioBairro.find({
                    select: ["codigoBairro", "municipio", "nome", "status"],
                    relations: ["municipio"]
                });
                const todosBairros = this.listarBairros(bairros);
                return resposta.status(200).json(todosBairros);
            }
            catch (error) {
                return resposta.status(400).json({ mensagem: "Erro ao listar os bairros", error });
            }
        }
    }
    async listaFiltrada({ codigoBairro, codigoMunicipio, nome, status }, requisicao, resposta) {
        try {
            let filtarBairros = {};
            if (codigoBairro) {
                filtarBairros.codigoBairro = Number(codigoBairro);
            }
            if (nome) {
                filtarBairros.nome = nome;
            }
            if (codigoMunicipio) {
                filtarBairros.codigoMunicipio = codigoMunicipio;
            }
            if (status !== undefined) {
                const statusNumero = Number(status);
                if (statusNumero === 1 || statusNumero === 2) {
                    filtarBairros.status = Number(status);
                }
            }
            const bairroRepositorio = this.obterRepositorio();
            const bairrosFiltrados = await bairroRepositorio.find({
                where: filtarBairros, select: ['codigoBairro', "municipio", 'nome', "status"],
                relations: ["municipio"]
            });
            const todosBairros = this.listarBairros(bairrosFiltrados);
            return resposta.status(200).json(todosBairros);
        }
        catch (error) {
            return resposta.status(400).json({ mensagem: 'Erro ao filtrar os Bairros', status: 400, error });
        }
    }
}
exports.ListarBairro = ListarBairro;
