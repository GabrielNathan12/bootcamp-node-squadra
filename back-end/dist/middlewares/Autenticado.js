"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eAutenticado = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const autores_1 = __importDefault(require("../configuracoes/autores"));
function eAutenticado(requisicao, resposta, proximo) {
    const pessoaAutenticado = requisicao.headers.authorization;
    if (!pessoaAutenticado) {
        return resposta.status(400).json({ mensagem: 'Login nao informado', status: 400 });
    }
    const [, token] = pessoaAutenticado.split(' ');
    try {
        const codigoToken = (0, jsonwebtoken_1.verify)(token, autores_1.default.jwt.segreedo);
        const { sub } = codigoToken;
        requisicao.pessoa = {
            codigoPessoa: sub
        };
        return proximo();
    }
    catch (error) {
        return resposta.status(400).json({ mensagem: 'Login nao informado', status: 400 });
    }
}
exports.eAutenticado = eAutenticado;
