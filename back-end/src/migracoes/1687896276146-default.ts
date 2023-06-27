import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687896276146 implements MigrationInterface {
    name = 'Default1687896276146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PESSOA" DROP COLUMN "DATA_NASC"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PESSOA" ADD "DATA_NASC" date NOT NULL`);
    }

}
