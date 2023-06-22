import "dotenv/config";
import "reflect-metadata";

import { DataSource } from 'typeorm';

const porta = process.env.DBPORTA as number | undefined;

export const AppDataSource = new DataSource({
    type:'oracle',
    host: process.env.DBHOST,
    username: process.env.DBUSER,
    password: process.env.DBSENHA,
    port: porta,
    database: process.env.DBDATA,
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    migrations:[`${__dirname}/**/migrations/*.{ts,js}`]
})