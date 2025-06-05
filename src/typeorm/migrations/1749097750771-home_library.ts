import { MigrationInterface, QueryRunner } from 'typeorm';

export class HomeLibrary1749097750771 implements MigrationInterface {
  name = 'HomeLibrary1749097750771';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_373ead146f110f04dad60848154" PRIMARY KEY ("userId"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "auth"`);
  }
}
