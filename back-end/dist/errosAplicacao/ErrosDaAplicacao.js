"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrosDaAplicacao = void 0;
class ErrosDaAplicacao extends Error {
    constructor(mensagem, status) {
        super(mensagem);
        this.name = this.constructor.name;
        this.status = status;
    }
}
exports.ErrosDaAplicacao = ErrosDaAplicacao;
