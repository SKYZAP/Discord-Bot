import {MigrationInterface, QueryRunner} from "typeorm";

export class userInit1610994891504 implements MigrationInterface {
    name = 'userInit1610994891504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "discordId" character varying NOT NULL, "username" character varying NOT NULL, "length" integer NOT NULL, "playtime" integer NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
