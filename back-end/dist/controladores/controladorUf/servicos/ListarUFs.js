"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarUFs = void 0;
class ListarUFs {
    constructor(repositorio) {
        this.repositorioUf = repositorio;
    }
    async listarUf(requisicao, resposta) {
        const ufRepositorio = this.repositorioUf.ufRepositorio;
        const { codigoUF, nome, sigla, status } = requisicao.query;
        if (codigoUF || nome || sigla || status) {
            this.listaFiltrada({ codigoUF: Number(codigoUF), nome: nome, sigla: sigla, status: Number(status) }, requisicao, resposta);
        }
        else {
            return resposta.status(200).json(await ufRepositorio.find({}));
        }
    }
    async listaFiltrada({ codigoUF, nome, sigla, status }, requisicao, resposta) {
        try {
            let filtarDados = {};
            if (codigoUF) {
                filtarDados.codigoUF = Number(codigoUF);
            }
            if (nome) {
                filtarDados.nome = nome;
            }
            if (sigla) {
                filtarDados.sigla = sigla;
            }
            if (status) {
                filtarDados.status = Number(status);
            }
            const ufsFiltrados = await this.repositorioUf.ufRepositorio.find({ where: filtarDados });
            return resposta.status(200).json(ufsFiltrados);
        }
        catch (error) {
            return resposta.status(400).json({ mensagem: 'Erro ao filtrar UFs', status: '400' + error });
        }
    }
}
exports.ListarUFs = ListarUFs;
