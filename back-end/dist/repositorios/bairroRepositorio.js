"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bairroRepositorio = void 0;
const data_source_1 = require("../data-source");
const Bairro_1 = require("../entidades/Bairro");
exports.bairroRepositorio = data_source_1.AppDataSource.getRepository(Bairro_1.Bairro);
