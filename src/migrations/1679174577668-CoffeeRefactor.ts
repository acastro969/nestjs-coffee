import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1679174577668 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    `ALTER TABLE "coffee" RENAME COLUMN "name" to "title"`;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    `ALTER TABLE "coffee" RENAME COLUMN "title" to "name"`;
  }
}
