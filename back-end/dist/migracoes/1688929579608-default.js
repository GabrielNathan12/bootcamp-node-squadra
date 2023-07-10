"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1688929579608 = void 0;
class Default1688929579608 {
    constructor() {
        this.name = 'Default1688929579608';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "TB_UF" ("CODIGO_UF" number GENERATED BY DEFAULT AS IDENTITY, "SIGLA" varchar2(255) NOT NULL, "NOME" varchar2(255) NOT NULL, "STATUS" number NOT NULL, CONSTRAINT "PK_339bb801620f29096d4e6e30032" PRIMARY KEY ("CODIGO_UF"))`);
        await queryRunner.query(`CREATE TABLE "TB_MUNICIPIO" ("CODIGO_MUNICIPIO" number GENERATED BY DEFAULT AS IDENTITY, "NOME" varchar2(255) NOT NULL, "STATUS" number NOT NULL, "Codigo_UF" number, CONSTRAINT "PK_e51036cbecd2061b3af7b2ddb46" PRIMARY KEY ("CODIGO_MUNICIPIO"))`);
        await queryRunner.query(`CREATE TABLE "TB_PESSOA" ("CODIGO_PESSOA" number GENERATED BY DEFAULT AS IDENTITY, "NOME" varchar2(255) NOT NULL, "SOBRENOME" varchar2(255) NOT NULL, "IDADE" number NOT NULL, "LOGIN" varchar2(255) NOT NULL, "SENHA" varchar2(255) NOT NULL, "STATUS" number NOT NULL, CONSTRAINT "UQ_38f18e42492662690521ce4ebcf" UNIQUE ("LOGIN"), CONSTRAINT "PK_7cb2b7890cf20977a56b5ade442" PRIMARY KEY ("CODIGO_PESSOA"))`);
        await queryRunner.query(`CREATE TABLE "TB_ENDERECO" ("CODIGO_ENDERECO" number GENERATED BY DEFAULT AS IDENTITY, "NOME_RUA" varchar2(255) NOT NULL, "NUMERO" number NOT NULL, "COMPLEMENTO" varchar2(255) NOT NULL, "CEP" varchar2(255) NOT NULL, "STATUS" number NOT NULL, "CODIGO_PESSOA" number, "CODIGO_BAIRRO" number, CONSTRAINT "PK_2006c133e7c56a888972bfccdc4" PRIMARY KEY ("CODIGO_ENDERECO"))`);
        await queryRunner.query(`CREATE TABLE "TB_BAIRRO" ("CODIGO_BAIRRO" number GENERATED BY DEFAULT AS IDENTITY, "NOME" varchar2(255) NOT NULL, "STATUS" number NOT NULL, "CODIGO_MUNICIPIO" number, CONSTRAINT "PK_9833908deb14eab8c36f6850eb2" PRIMARY KEY ("CODIGO_BAIRRO"))`);
        await queryRunner.query(`ALTER TABLE "TB_MUNICIPIO" ADD CONSTRAINT "FK_6baf819c4df317e8e89a1e04967" FOREIGN KEY ("Codigo_UF") REFERENCES "TB_UF" ("CODIGO_UF")`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" ADD CONSTRAINT "FK_7b04848cc0eda7c16d72a69ae9e" FOREIGN KEY ("CODIGO_PESSOA") REFERENCES "TB_PESSOA" ("CODIGO_PESSOA")`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" ADD CONSTRAINT "FK_19905bbde841192c7fa90c0ec50" FOREIGN KEY ("CODIGO_BAIRRO") REFERENCES "TB_BAIRRO" ("CODIGO_BAIRRO")`);
        await queryRunner.query(`ALTER TABLE "TB_BAIRRO" ADD CONSTRAINT "FK_f910210e141c8d8274e922ff80b" FOREIGN KEY ("CODIGO_MUNICIPIO") REFERENCES "TB_MUNICIPIO" ("CODIGO_MUNICIPIO")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "TB_BAIRRO" DROP CONSTRAINT "FK_f910210e141c8d8274e922ff80b"`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" DROP CONSTRAINT "FK_19905bbde841192c7fa90c0ec50"`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" DROP CONSTRAINT "FK_7b04848cc0eda7c16d72a69ae9e"`);
        await queryRunner.query(`ALTER TABLE "TB_MUNICIPIO" DROP CONSTRAINT "FK_6baf819c4df317e8e89a1e04967"`);
        await queryRunner.query(`DROP TABLE "TB_BAIRRO"`);
        await queryRunner.query(`DROP TABLE "TB_ENDERECO"`);
        await queryRunner.query(`DROP TABLE "TB_PESSOA"`);
        await queryRunner.query(`DROP TABLE "TB_MUNICIPIO"`);
        await queryRunner.query(`DROP TABLE "TB_UF"`);
    }
}
exports.Default1688929579608 = Default1688929579608;
