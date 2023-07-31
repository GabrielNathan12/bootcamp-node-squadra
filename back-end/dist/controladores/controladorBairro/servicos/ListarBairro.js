"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarBairro = void 0;
class ListarBairro {
    constructor(repositorio) {
        this.repositorios = repositorio;
    }
    async listarBairro(requisicao, resposta) {
        const repositorio = this.repositorios.bairroRepositorio;
        const { codigoBairro, nome, status } = requisicao.query;
        if (codigoBairro || nome || status) {
            this.listaFiltrada({ codigoBairro: Number(codigoBairro), nome: nome, status: Number(status) }, requisicao, resposta);
        }
        else {
            return resposta.status(200).json(await repositorio.find({ relations: { enderecos: true } }));
        }
    }
    async listaFiltrada({ codigoBairro, nome, status }, requisicao, resposta) {
        try {
            let filtarBairros = {};
            if (codigoBairro) {
                filtarBairros.codigoBairro = Number(codigoBairro);
            }
            if (nome) {
                filtarBairros.nome = nome;
            }
            if (status !== undefined) {
                const statusNumero = Number(status);
                if (statusNumero === 0 || statusNumero === 1) {
                    filtarBairros.status = Number(status);
                }
            }
            const bairrosFiltrados = await this.repositorios.bairroRepositorio.find({ where: filtarBairros });
            return resposta.status(200).json(bairrosFiltrados);
        }
        catch (error) {
            return resposta.status(400).json({ mensagem: 'Erro ao filtrar os Bairros', status: '400' + error });
        }
    }
}
exports.ListarBairro = ListarBairro;
