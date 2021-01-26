import {MigrationInterface, QueryRunner} from "typeorm";

export class initReminder1611508485480 implements MigrationInterface {
    name = 'initReminder1611508485480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reminder" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying NOT NULL, "time" TIMESTAMP NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_9ec029d17cb8dece186b9221ede" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reminder" ADD CONSTRAINT "FK_c4cc144b2a558182ac6d869d2a4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reminder" DROP CONSTRAINT "FK_c4cc144b2a558182ac6d869d2a4"`);
        await queryRunner.query(`DROP TABLE "reminder"`);
    }

}
