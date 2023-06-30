import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688098056314 implements MigrationInterface {
    name = 'Default1688098056314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tb_BaiTB_BAIRRO" ADD "enderecosCodigoEndereco" number`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" DROP CONSTRAINT "FK_19905bbde841192c7fa90c0ec50"`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" MODIFY "COMPLEMENTO" varchar2(255)  NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" DROP CONSTRAINT "REL_19905bbde841192c7fa90c0ec5"`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" ADD CONSTRAINT "FK_19905bbde841192c7fa90c0ec50" FOREIGN KEY ("CODIGO_BAIRRO") REFERENCES "Tb_BaiTB_BAIRRO" ("CODIGO_BAIRRO")`);
        await queryRunner.query(`ALTER TABLE "Tb_BaiTB_BAIRRO" ADD CONSTRAINT "FK_eeb64ceb80106711c73c31e164d" FOREIGN KEY ("enderecosCodigoEndereco") REFERENCES "TB_ENDERECO" ("CODIGO_ENDERECO")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tb_BaiTB_BAIRRO" DROP CONSTRAINT "FK_eeb64ceb80106711c73c31e164d"`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" DROP CONSTRAINT "FK_19905bbde841192c7fa90c0ec50"`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" ADD CONSTRAINT "REL_19905bbde841192c7fa90c0ec5" UNIQUE ("CODIGO_BAIRRO")`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" MODIFY "COMPLEMENTO" varchar2(255)  NULL`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" ADD CONSTRAINT "FK_19905bbde841192c7fa90c0ec50" FOREIGN KEY ("CODIGO_BAIRRO") REFERENCES "Tb_BaiTB_BAIRRO" ("CODIGO_BAIRRO")`);
        await queryRunner.query(`ALTER TABLE "Tb_BaiTB_BAIRRO" DROP COLUMN "enderecosCodigoEndereco"`);
    }

}
