"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControladorUF = void 0;
const ListarUFs_1 = require("./servicos/ListarUFs");
const CriarUF_1 = require("./servicos/CriarUF");
const AtualizarUF_1 = require("./servicos/AtualizarUF");
const DeletarUF_1 = require("./servicos/DeletarUF");
class ControladorUF {
    constructor(repositorio) {
        this.repositorios = repositorio;
    }
    async litarUF(requisicao, resposta) {
        try {
            const listaUf = new ListarUFs_1.ListarUFs(this.repositorios);
            const ufs = await listaUf.listarUf(requisicao, resposta);
            return ufs;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    async criarUf(requisicao, resposta) {
        try {
            const { nome, sigla, status } = requisicao.body;
            if (nome === undefined || sigla === undefined || status === undefined) {
                return resposta.status(400).json({ mensagem: 'Erro ao encontrar dados no Json', status: '400' });
            }
            if (!this.verificaQtdSiglas(sigla)) {
                return resposta.status(400).json({ mensagem: 'Sigla invalida', status: '400' });
            }
            if (!this.verificaStatus(Number(status))) {
                return resposta.status(400).json({ mensagem: 'Status do campo invalido', status: '400' });
            }
            const criarUF = new CriarUF_1.CriarUF(this.repositorios);
            const uf = await criarUF.criarNovoUF({ nome, sigla, status }, requisicao, resposta);
            return uf;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    async atualizarUf(requisicao, resposta) {
        try {
            const { codigoUF, nome, sigla, status } = requisicao.body;
            const atualizarUF = new AtualizarUF_1.AtualizarUF(this.repositorios);
            if (!this.verificaQtdSiglas(sigla)) {
                return resposta.status(400).json({ mensagem: 'Sigla invalida', status: '400' });
            }
            if (!this.verificaStatus(Number(status))) {
                return resposta.status(400).json({ mensagem: 'Status do campo invalido', status: '400' });
            }
            const uf = await atualizarUF.atualizarUf({ codigoUF, nome, sigla, status }, requisicao, resposta);
            return uf;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    async deletarUf(requisicao, resposta) {
        try {
            const { codigoUF } = requisicao.params;
            const deletarPeloId = new DeletarUF_1.DeletarUF(this.repositorios);
            const deletado = await deletarPeloId.deletarUF({ codigoUF: Number(codigoUF) }, resposta);
            return deletado;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    verificaQtdSiglas(sigla) {
        if (sigla.length === 2) {
            return true;
        }
        return false;
    }
    verificaStatus(status) {
        if (status === 0 || status === 1) {
            return true;
        }
        return false;
    }
}
exports.ControladorUF = ControladorUF;
