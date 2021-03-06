import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';

export default class CreateUserTable1574450733448 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userTable = new Table({
      name: 'users',
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
        { name: 'email', type: 'varchar', isUnique: true, length: '20' },
        { name: 'firstName', type: 'varchar', length: '20', isNullable: false },
        { name: 'lastName', type: 'varchar', length: '20' },
        { name: 'password', type: 'varchar' },
        { name: 'createdAt', type: 'timestamptz', default: 'NOW()' },
        { name: 'updatedAt', type: 'timestamptz', default: 'NOW()' },
      ],
    });
    await queryRunner.createTable(userTable, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
