"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pessoaRepositorio = void 0;
const data_source_1 = require("../data-source");
const Pessoa_1 = require("../entidades/Pessoa");
exports.pessoaRepositorio = data_source_1.AppDataSource.getRepository(Pessoa_1.Pessoa);
