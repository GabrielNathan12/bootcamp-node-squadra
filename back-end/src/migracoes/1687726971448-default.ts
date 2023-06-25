import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687726971448 implements MigrationInterface {
    name = 'Default1687726971448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tb_Endereco" ADD "Status" number NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tb_Endereco" DROP COLUMN "Status"`);
    }

}
