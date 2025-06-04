import { MigrationInterface, QueryRunner } from 'typeorm';

export class HomeLibrary1749047081471 implements MigrationInterface {
  name = 'HomeLibrary1749047081471';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_952e252e7470ff78b18a9ec786d" UNIQUE ("login"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "auth"`);
  }
}
