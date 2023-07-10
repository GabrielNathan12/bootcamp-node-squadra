"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enderecoRepositorio = void 0;
const data_source_1 = require("../data-source");
const Endereco_1 = require("../entidades/Endereco");
exports.enderecoRepositorio = data_source_1.AppDataSource.getRepository(Endereco_1.Endereco);
