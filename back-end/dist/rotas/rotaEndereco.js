"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorEndereco_1 = require("../controladores/controladorEndereco/ControladorEndereco");
const ufRepositorio_1 = require("../repositorios/ufRepositorio");
const bairroRepositorio_1 = require("../repositorios/bairroRepositorio");
const enderecosRepositorio_1 = require("../repositorios/enderecosRepositorio");
const municipioRepositorio_1 = require("../repositorios/municipioRepositorio");
const pessoaRepositorio_1 = require("../repositorios/pessoaRepositorio");
const Autenticado_1 = require("../middlewares/Autenticado");
const repositorios = {
    ufRepositorio: ufRepositorio_1.ufRepositorio,
    bairroRepositorio: bairroRepositorio_1.bairroRepositorio,
    municipioRepositorio: municipioRepositorio_1.municipioRepositorio,
    enderecoRepositorio: enderecosRepositorio_1.enderecoRepositorio,
    pessoaRepositorio: pessoaRepositorio_1.pessoaRepositorio,
};
const rotaEndereco = (0, express_1.Router)();
const ControladorGeral = new ControladorEndereco_1.ControladorEndereco(repositorios);
rotaEndereco.get('/endereco', (requisicao, resposta) => ControladorGeral.listarEndereco(requisicao, resposta));
rotaEndereco.post('/endereco', Autenticado_1.eAutenticado, (requisicao, resposta) => ControladorGeral.criarEndereco(requisicao, resposta));
rotaEndereco.put('/endereco', Autenticado_1.eAutenticado, (requisicao, resposta) => ControladorGeral.atualizarEndereco(requisicao, resposta));
rotaEndereco.delete('/endereco/:codigoEndereco', Autenticado_1.eAutenticado, (requisicao, resposta) => ControladorGeral.deletarEndereco(requisicao, resposta));
exports.default = rotaEndereco;
