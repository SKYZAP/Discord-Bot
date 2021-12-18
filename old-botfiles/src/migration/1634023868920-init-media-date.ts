import {MigrationInterface, QueryRunner} from "typeorm";

export class initMediaDate1634023868920 implements MigrationInterface {
    name = 'initMediaDate1634023868920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" ADD "date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "date"`);
    }

}
