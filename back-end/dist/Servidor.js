"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const rotaUf_1 = __importDefault(require("./rotas/rotaUf"));
const rotaMunicipio_1 = __importDefault(require("./rotas/rotaMunicipio"));
const rotaBairro_1 = __importDefault(require("./rotas/rotaBairro"));
const rotaEndereco_1 = __importDefault(require("./rotas/rotaEndereco"));
const rotaPessoa_1 = __importDefault(require("./rotas/rotaPessoa"));
const cors_1 = __importDefault(require("cors"));
const rotaAutenticacao_1 = __importDefault(require("./rotas/rotaAutenticacao"));
data_source_1.AppDataSource.initialize().then(() => {
    const servidor = (0, express_1.default)();
    servidor.use(express_1.default.json());
    servidor.use((0, cors_1.default)());
    servidor.use(rotaUf_1.default);
    servidor.use(rotaMunicipio_1.default);
    servidor.use(rotaBairro_1.default);
    servidor.use(rotaEndereco_1.default);
    servidor.use(rotaPessoa_1.default);
    servidor.use(rotaAutenticacao_1.default);
    console.log("Conexão realizada com a Oracle");
    return servidor.listen(process.env.DBPORTASER);
});
