"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorBairro_1 = require("../controladores/controladorBairro/ControladorBairro");
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
const rotaBairro = (0, express_1.Router)();
const ControladorGeral = new ControladorBairro_1.ControladorBairro(repositorios);
rotaBairro.get('/bairro', (requisicao, resposta) => ControladorGeral.listarBairro(requisicao, resposta));
rotaBairro.post('/bairro', (requisicao, resposta) => ControladorGeral.criarBairro(requisicao, resposta));
rotaBairro.put('/bairro', Autenticado_1.eAutenticado, (requisicao, resposta) => ControladorGeral.atualizarBairro(requisicao, resposta));
rotaBairro.delete('/bairro/:codigoBairro', Autenticado_1.eAutenticado, (requisicao, resposta) => ControladorGeral.deletarBairro(requisicao, resposta));
exports.default = rotaBairro;
