"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorMunicipio_1 = require("../controladores/controladorMunicipio/ControladorMunicipio");
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
const rotaMunicipio = (0, express_1.Router)();
const ControladorGeral = new ControladorMunicipio_1.ControladorMunicipio(repositorios);
rotaMunicipio.get('/municipio', (requisicao, resposta) => ControladorGeral.listarMunicipio(requisicao, resposta));
rotaMunicipio.post('/municipio', Autenticado_1.eAutenticado, (requisicao, resposta) => ControladorGeral.criarMunicipio(requisicao, resposta));
rotaMunicipio.put('/municipio', Autenticado_1.eAutenticado, (requisicao, resposta) => ControladorGeral.atualizarMunicipio(requisicao, resposta));
rotaMunicipio.delete('/municipio/:codigoMunicipio', Autenticado_1.eAutenticado, (requisicao, resposta) => ControladorGeral.deletarMunicipio(requisicao, resposta));
exports.default = rotaMunicipio;
