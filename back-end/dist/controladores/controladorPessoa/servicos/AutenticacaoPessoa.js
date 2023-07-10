"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticacaoPessoa = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const autores_1 = __importDefault(require("../../../configuracoes/autores"));
class AutenticacaoPessoa {
    constructor(repositorios) {
        this.repositorios = repositorios;
    }
    async criarAutenticacao({ login, senha }, requisicao, resposta) {
        const pessoaRepositorio = this.repositorios.pessoaRepositorio;
        const pessoa = await pessoaRepositorio.findOne({ where: { login } });
        if (!pessoa) {
            resposta.status(400).json({ mensagem: "Email inválido", status: "400" });
            throw new Error("Email inválido");
        }
        const senhaConfirmada = await (0, bcryptjs_1.compare)(senha, pessoa.senha);
        if (!senhaConfirmada) {
            resposta.status(400).json({ mensagem: "Senha inválida", status: "400" });
            throw new Error("Senha inválida");
        }
        const token = (0, jsonwebtoken_1.sign)({ pessoaId: pessoa.codigoPessoa }, autores_1.default.jwt.segreedo, { expiresIn: autores_1.default.jwt.expirado,
        });
        return { pessoa, token };
    }
}
exports.AutenticacaoPessoa = AutenticacaoPessoa;
