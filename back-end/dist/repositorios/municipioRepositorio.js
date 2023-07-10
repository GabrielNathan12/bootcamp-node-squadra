"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.municipioRepositorio = void 0;
const data_source_1 = require("../data-source");
const Municipio_1 = require("../entidades/Municipio");
exports.municipioRepositorio = data_source_1.AppDataSource.getRepository(Municipio_1.Municipio);
