import {MigrationInterface, QueryRunner} from "typeorm";

export class fixReminder1611729824086 implements MigrationInterface {
    name = 'fixReminder1611729824086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reminder" ADD "offset" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reminder" DROP COLUMN "offset"`);
    }

}
