import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1679175452660 implements MigrationInterface {
  name = 'SchemaSync1679175452660';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "recommendations" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "description" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "coffee" DROP COLUMN "recommendations"`,
    );
  }
}
