import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1703889700159 implements MigrationInterface {
    name = 'Default1703889700159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_UF" ADD CONSTRAINT "UQ_6d05b2beb99bcca9b77dedd740e" UNIQUE ("SIGLA")`);
        await queryRunner.query(`ALTER TABLE "TB_UF" ADD CONSTRAINT "UQ_6305ac6b71a258f67ddd058f744" UNIQUE ("NOME")`);
        await queryRunner.query(`ALTER TABLE "TB_MUNICIPIO" ADD CONSTRAINT "UQ_bc992d3bf9a87f35798527e275b" UNIQUE ("Codigo_UF", "NOME")`);
        await queryRunner.query(`ALTER TABLE "TB_BAIRRO" ADD CONSTRAINT "UQ_656a64c72d99e3c20af7c44d14b" UNIQUE ("CODIGO_MUNICIPIO", "NOME")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_BAIRRO" DROP CONSTRAINT "UQ_656a64c72d99e3c20af7c44d14b"`);
        await queryRunner.query(`ALTER TABLE "TB_MUNICIPIO" DROP CONSTRAINT "UQ_bc992d3bf9a87f35798527e275b"`);
        await queryRunner.query(`ALTER TABLE "TB_UF" DROP CONSTRAINT "UQ_6305ac6b71a258f67ddd058f744"`);
        await queryRunner.query(`ALTER TABLE "TB_UF" DROP CONSTRAINT "UQ_6d05b2beb99bcca9b77dedd740e"`);
    }

}
