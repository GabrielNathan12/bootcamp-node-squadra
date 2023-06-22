import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687460714392 implements MigrationInterface {
    name = 'Default1687460714392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tb_Bairro" ADD CONSTRAINT "FK_59971a8a0c879dee95252379a43" FOREIGN KEY ("Codigo_Municipio") REFERENCES "Tb_Municipio" ("Codigo_Municipio")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tb_Bairro" DROP CONSTRAINT "FK_59971a8a0c879dee95252379a43"`);
    }

}
