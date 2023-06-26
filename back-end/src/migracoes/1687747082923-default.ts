import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687747082923 implements MigrationInterface {
    name = 'Default1687747082923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" RENAME COLUMN "COMPLEMENTI" TO "COMPLEMENTO"`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" DROP COLUMN "COMPLEMENTO"`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" ADD "COMPLEMENTO" varchar2(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" DROP COLUMN "COMPLEMENTO"`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" ADD "COMPLEMENTO" varchar2(255)`);
        await queryRunner.query(`ALTER TABLE "TB_ENDERECO" RENAME COLUMN "COMPLEMENTO" TO "COMPLEMENTI"`);
    }

}
