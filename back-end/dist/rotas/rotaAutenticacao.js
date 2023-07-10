"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ufRepositorio_1 = require("../repositorios/ufRepositorio");
const bairroRepositorio_1 = require("../repositorios/bairroRepositorio");
const municipioRepositorio_1 = require("../repositorios/municipioRepositorio");
const enderecosRepositorio_1 = require("../repositorios/enderecosRepositorio");
const pessoaRepositorio_1 = require("../repositorios/pessoaRepositorio");
const ControladorAutenticacao_1 = require("../controladores/controladorPessoa/ControladorAutenticacao");
const repositorios = {
    ufRepositorio: ufRepositorio_1.ufRepositorio,
    bairroRepositorio: bairroRepositorio_1.bairroRepositorio,
    municipioRepositorio: municipioRepositorio_1.municipioRepositorio,
    enderecoRepositorio: enderecosRepositorio_1.enderecoRepositorio,
    pessoaRepositorio: pessoaRepositorio_1.pessoaRepositorio,
};
const rotaAutenticacao = (0, express_1.Router)();
const controladorAutenticacao = new ControladorAutenticacao_1.ControladorAutenticacao(repositorios);
rotaAutenticacao.post("/autenticar", (requisicao, resposta) => controladorAutenticacao.criarSecao(requisicao, resposta));
exports.default = rotaAutenticacao;
