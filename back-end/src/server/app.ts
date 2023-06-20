import { DataSource } from "typeorm";

const conexaoOracle = new DataSource({
    type: 'oracle',
    host: 'localhost',
    port: 1521,
    username: 'C##NODE',
    password: 'node',
    database: 'XE',
    migrations: [],
    entities: []
});

conexaoOracle.initialize().then(() => {
    console.log("Conexao realizada com sucesso com o Banco de Dados Oracle!!");
}).catch((erro)=>{
    console.log("Ocorreu um erro ", erro);
});

const conexaoPostgre = new DataSource({
    type: "postgres", 
    host: 'localhost',
    port: 5432,
    username: "postgres",
    password: "welcome1", 
    database: 'Bootcamp_Node'
});
conexaoPostgre.initialize().then(()=>{
    console.log("Conexao realizada com sucesso com o Banco de Dados Postgre!!");
}).catch((error)=>{
    console.log("Ocorreu um erro", error);
})
export default {conexaoPostgre, conexaoOracle};