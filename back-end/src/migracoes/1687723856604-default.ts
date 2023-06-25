import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687723856604 implements MigrationInterface {
    name = 'Default1687723856604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tb_Endereco" DROP COLUMN "Codigo_Pessoa"`);
        await queryRunner.query(`ALTER TABLE "Tb_Endereco" DROP COLUMN "Numero"`);
        await queryRunner.query(`ALTER TABLE "Tb_Municipio" DROP CONSTRAINT "FK_60b80f5af0ad4a5cde964ae057c"`);
        await queryRunner.query(`ALTER TABLE "Tb_Municipio" MODIFY "Codigo_UF" number  NULL`);
        await queryRunner.query(`ALTER TABLE "Tb_Bairro" DROP CONSTRAINT "FK_59971a8a0c879dee95252379a43"`);
        await queryRunner.query(`ALTER TABLE "Tb_Bairro" MODIFY "Codigo_Municipio" number  NULL`);
        await queryRunner.query(`ALTER TABLE "Tb_Endereco" DROP CONSTRAINT "FK_54180804cd089e7d0b9ba02f84f"`);
        await queryRunner.query(`ALTER TABLE "Tb_Endereco" MODIFY "Codigo_Bairro" number  NULL`);
        await queryRunner.query(`ALTER TABLE "Tb_Municipio" ADD CONSTRAINT "FK_60b80f5af0ad4a5cde964ae057c" FOREIGN KEY ("Codigo_UF") REFERENCES "Tb_Uf" ("Codigo_UF")`);
        await queryRunner.query(`ALTER TABLE "Tb_Bairro" ADD CONSTRAINT "FK_59971a8a0c879dee95252379a43" FOREIGN KEY ("Codigo_Municipio") REFERENCES "Tb_Municipio" ("Codigo_Municipio")`);
        await queryRunner.query(`ALTER TABLE "Tb_Endereco" ADD CONSTRAINT "FK_54180804cd089e7d0b9ba02f84f" FOREIGN KEY ("Codigo_Bairro") REFERENCES "Tb_Bairro" ("Codigo_Bairro")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tb_Endereco" DROP CONSTRAINT "FK_54180804cd089e7d0b9ba02f84f"`);
        await queryRunner.query(`ALTER TABLE "Tb_Bairro" DROP CONSTRAINT "FK_59971a8a0c879dee95252379a43"`);
        await queryRunner.query(`ALTER TABLE "Tb_Municipio" DROP CONSTRAINT "FK_60b80f5af0ad4a5cde964ae057c"`);
        await queryRunner.query(`ALTER TABLE "Tb_Endereco" MODIFY "Codigo_Bairro" number  NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tb_Endereco" ADD CONSTRAINT "FK_54180804cd089e7d0b9ba02f84f" FOREIGN KEY ("Codigo_Bairro") REFERENCES "Tb_Bairro" ("Codigo_Bairro")`);
        await queryRunner.query(`ALTER TABLE "Tb_Bairro" MODIFY "Codigo_Municipio" number  NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tb_Bairro" ADD CONSTRAINT "FK_59971a8a0c879dee95252379a43" FOREIGN KEY ("Codigo_Municipio") REFERENCES "Tb_Municipio" ("Codigo_Municipio")`);
        await queryRunner.query(`ALTER TABLE "Tb_Municipio" MODIFY "Codigo_UF" number  NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tb_Municipio" ADD CONSTRAINT "FK_60b80f5af0ad4a5cde964ae057c" FOREIGN KEY ("Codigo_UF") REFERENCES "Tb_Uf" ("Codigo_UF")`);
        await queryRunner.query(`ALTER TABLE "Tb_Endereco" ADD "Numero" number NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tb_Endereco" ADD "Codigo_Pessoa" number NOT NULL`);
    }

}
