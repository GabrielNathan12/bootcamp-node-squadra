import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687409456199 implements MigrationInterface {
    name = 'Default1687409456199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Tb_Uf" ("Codigo_UF" number GENERATED BY DEFAULT AS IDENTITY, "Sigla" varchar2(255) NOT NULL, "Nome_Municipio" varchar2(255) NOT NULL, "Status" number NOT NULL, CONSTRAINT "PK_b4dd5c674e9cb6324ddbe7acfcc" PRIMARY KEY ("Codigo_UF"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Tb_Uf"`);
    }

}
