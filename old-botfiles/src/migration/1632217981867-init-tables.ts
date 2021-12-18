import {MigrationInterface, QueryRunner} from "typeorm";

export class initTables1632217981867 implements MigrationInterface {
    name = 'initTables1632217981867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "jetracerId" uuid NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "jetracer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ipAddress" character varying NOT NULL, "macAddress" character varying NOT NULL, CONSTRAINT "PK_ed927d19955c228c75b9b3763e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_80611d2e98a23b59b7ddfc544b3" FOREIGN KEY ("jetracerId") REFERENCES "jetracer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_80611d2e98a23b59b7ddfc544b3"`);
        await queryRunner.query(`DROP TABLE "jetracer"`);
        await queryRunner.query(`DROP TABLE "media"`);
    }

}
