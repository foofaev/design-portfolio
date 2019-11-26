import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

export default class createUuidExtension1574450733448 implements MigrationInterface {
  up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  }

  down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp";');
  }
}
