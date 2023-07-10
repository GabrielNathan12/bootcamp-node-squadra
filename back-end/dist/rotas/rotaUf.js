"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorUf_1 = require("../controladores/controladorUf/ControladorUf");
const ufRepositorio_1 = require("../repositorios/ufRepositorio");
const bairroRepositorio_1 = require("../repositorios/bairroRepositorio");
const municipioRepositorio_1 = require("../repositorios/municipioRepositorio");
const enderecosRepositorio_1 = require("../repositorios/enderecosRepositorio");
const pessoaRepositorio_1 = require("../repositorios/pessoaRepositorio");
const Autenticado_1 = require("../middlewares/Autenticado");
const rotaUf = (0, express_1.Router)();
const repositorios = {
    ufRepositorio: ufRepositorio_1.ufRepositorio,
    bairroRepositorio: bairroRepositorio_1.bairroRepositorio,
    municipioRepositorio: municipioRepositorio_1.municipioRepositorio,
    enderecoRepositorio: enderecosRepositorio_1.enderecoRepositorio,
    pessoaRepositorio: pessoaRepositorio_1.pessoaRepositorio,
};
const ControladorGeral = new ControladorUf_1.ControladorUF(repositorios);
rotaUf.get('/uf', (requisicao, resposta) => ControladorGeral.litarUF(requisicao, resposta));
rotaUf.post('/uf', Autenticado_1.eAutenticado, (requisicao, resposta) => ControladorGeral.criarUf(requisicao, resposta));
rotaUf.put('/uf', Autenticado_1.eAutenticado, (requisicao, resposta) => ControladorGeral.atualizarUf(requisicao, resposta));
rotaUf.delete('/uf/:codigoUF', Autenticado_1.eAutenticado, (requisicao, resposta) => ControladorGeral.deletarUf(requisicao, resposta));
exports.default = rotaUf;
