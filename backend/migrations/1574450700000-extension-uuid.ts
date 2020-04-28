import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

export default class CreateUuidExtension1574450733448 implements MigrationInterface {
  up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  }

  down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp";');
  }
}
