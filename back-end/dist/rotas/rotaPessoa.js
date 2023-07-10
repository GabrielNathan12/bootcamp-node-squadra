"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorPessoa_1 = require("../controladores/controladorPessoa/ControladorPessoa");
const ufRepositorio_1 = require("../repositorios/ufRepositorio");
const bairroRepositorio_1 = require("../repositorios/bairroRepositorio");
const municipioRepositorio_1 = require("../repositorios/municipioRepositorio");
const enderecosRepositorio_1 = require("../repositorios/enderecosRepositorio");
const pessoaRepositorio_1 = require("../repositorios/pessoaRepositorio");
const Autenticado_1 = require("../middlewares/Autenticado");
const repositorios = {
    ufRepositorio: ufRepositorio_1.ufRepositorio,
    bairroRepositorio: bairroRepositorio_1.bairroRepositorio,
    municipioRepositorio: municipioRepositorio_1.municipioRepositorio,
    enderecoRepositorio: enderecosRepositorio_1.enderecoRepositorio,
    pessoaRepositorio: pessoaRepositorio_1.pessoaRepositorio,
};
const rotaPessoa = (0, express_1.Router)();
const ControladorGeral = new ControladorPessoa_1.ControladorPessoa(repositorios);
rotaPessoa.get('/pessoa', (requisicao, resposta) => ControladorGeral.listarPessoa(requisicao, resposta));
rotaPessoa.post('/pessoa', Autenticado_1.eAutenticado, (requisicao, resposta) => ControladorGeral.criarPessoa(requisicao, resposta));
rotaPessoa.put('/pessoa', Autenticado_1.eAutenticado, (requisicao, resposta) => ControladorGeral.atualizarPessoa(requisicao, resposta));
rotaPessoa.delete('/pessoa/:codigoPessoa', Autenticado_1.eAutenticado, (requisicao, resposta) => ControladorGeral.deletarPessoa(requisicao, resposta));
exports.default = rotaPessoa;
