import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688098167611 implements MigrationInterface {
    name = 'Default1688098167611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" DROP CONSTRAINT "FK_19905bbde841192c7fa90c0ec50"`);
        await queryRunner.query(`CREATE TABLE "TB_BAIRRO" ("CODIGO_BAIRRO" number GENERATED BY DEFAULT AS IDENTITY, "NOME" varchar2(255) NOT NULL, "STATUS" number NOT NULL, "CODIGO_MUNICIPIO" number, "enderecosCodigoEndereco" number, CONSTRAINT "PK_9833908deb14eab8c36f6850eb2" PRIMARY KEY ("CODIGO_BAIRRO"))`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" ADD CONSTRAINT "FK_19905bbde841192c7fa90c0ec50" FOREIGN KEY ("CODIGO_BAIRRO") REFERENCES "TB_BAIRRO" ("CODIGO_BAIRRO")`);
        await queryRunner.query(`ALTER TABLE "TB_BAIRRO" ADD CONSTRAINT "FK_f910210e141c8d8274e922ff80b" FOREIGN KEY ("CODIGO_MUNICIPIO") REFERENCES "TB_MUNICIPIO" ("CODIGO_MUNICIPIO")`);
        await queryRunner.query(`ALTER TABLE "TB_BAIRRO" ADD CONSTRAINT "FK_d20b2d173b1e68d293f07ed4e15" FOREIGN KEY ("enderecosCodigoEndereco") REFERENCES "TB_ENDERECO" ("CODIGO_ENDERECO")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_BAIRRO" DROP CONSTRAINT "FK_d20b2d173b1e68d293f07ed4e15"`);
        await queryRunner.query(`ALTER TABLE "TB_BAIRRO" DROP CONSTRAINT "FK_f910210e141c8d8274e922ff80b"`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" DROP CONSTRAINT "FK_19905bbde841192c7fa90c0ec50"`);
        await queryRunner.query(`DROP TABLE "TB_BAIRRO"`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" ADD CONSTRAINT "FK_19905bbde841192c7fa90c0ec50" FOREIGN KEY ("CODIGO_BAIRRO") REFERENCES "Tb_BaiTB_BAIRRO" ("CODIGO_BAIRRO")`);
    }

}
