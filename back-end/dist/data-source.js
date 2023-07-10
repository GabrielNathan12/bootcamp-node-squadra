"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const porta = process.env.DBPORTA;
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'oracle',
    host: process.env.DBHOST,
    username: process.env.DBUSER,
    password: process.env.DBSENHA,
    port: porta,
    database: process.env.DBDATA,
    entities: [`${__dirname}/**/entidades/*.{ts,js}`],
    migrations: [`${__dirname}/**/migracoes/*.{ts,js}`],
});
