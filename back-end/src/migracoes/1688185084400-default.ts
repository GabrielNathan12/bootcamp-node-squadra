import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688185084400 implements MigrationInterface {
    name = 'Default1688185084400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PESSOA" ADD CONSTRAINT "UQ_38f18e42492662690521ce4ebcf" UNIQUE ("LOGIN")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PESSOA" DROP CONSTRAINT "UQ_38f18e42492662690521ce4ebcf"`);
    }

}
