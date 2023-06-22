import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687460555813 implements MigrationInterface {
    name = 'Default1687460555813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tb_Endereco" ADD "Nome_Pessoa" number`);
        await queryRunner.query(`ALTER TABLE "Tb_Municipio" ADD CONSTRAINT "FK_60b80f5af0ad4a5cde964ae057c" FOREIGN KEY ("Codigo_UF") REFERENCES "Tb_Uf" ("Codigo_UF")`);
        await queryRunner.query(`ALTER TABLE "Tb_Endereco" ADD CONSTRAINT "FK_ae1c7ecc61bdab6778e0ced2725" FOREIGN KEY ("Nome_Pessoa") REFERENCES "Tb_Pessoa" ("Codigo_Pessoa")`);
        await queryRunner.query(`ALTER TABLE "Tb_Endereco" ADD CONSTRAINT "FK_54180804cd089e7d0b9ba02f84f" FOREIGN KEY ("Codigo_Bairro") REFERENCES "Tb_Bairro" ("Codigo_Bairro")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tb_Endereco" DROP CONSTRAINT "FK_54180804cd089e7d0b9ba02f84f"`);
        await queryRunner.query(`ALTER TABLE "Tb_Endereco" DROP CONSTRAINT "FK_ae1c7ecc61bdab6778e0ced2725"`);
        await queryRunner.query(`ALTER TABLE "Tb_Municipio" DROP CONSTRAINT "FK_60b80f5af0ad4a5cde964ae057c"`);
        await queryRunner.query(`ALTER TABLE "Tb_Endereco" DROP COLUMN "Nome_Pessoa"`);
    }

}
