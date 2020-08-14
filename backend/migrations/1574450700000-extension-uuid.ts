import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

export default class CreateUuidExtension1574450733448 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp";');
  }
}
