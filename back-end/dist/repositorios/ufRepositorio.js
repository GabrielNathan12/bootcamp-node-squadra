"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ufRepositorio = void 0;
const data_source_1 = require("../data-source");
const UF_1 = require("../entidades/UF");
exports.ufRepositorio = data_source_1.AppDataSource.getRepository(UF_1.UF);
