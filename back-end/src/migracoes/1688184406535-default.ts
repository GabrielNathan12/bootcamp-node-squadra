import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688184406535 implements MigrationInterface {
    name = 'Default1688184406535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_BAIRRO" DROP CONSTRAINT "FK_d20b2d173b1e68d293f07ed4e15"`);
        await queryRunner.query(`ALTER TABLE "TB_BAIRRO" DROP COLUMN "enderecosCodigoEndereco"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_BAIRRO" ADD "enderecosCodigoEndereco" number`);
        await queryRunner.query(`ALTER TABLE "TB_BAIRRO" ADD CONSTRAINT "FK_d20b2d173b1e68d293f07ed4e15" FOREIGN KEY ("enderecosCodigoEndereco") REFERENCES "TB_ENDERECO" ("CODIGO_ENDERECO")`);
    }

}
