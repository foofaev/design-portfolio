import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';

export default class createUserTable1574450733448 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const userTable = new Table({
      name: 'users',
      columns: [
        {
          name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid',
        },
        {
          name: 'firstName', type: 'varchar', length: '20', isNullable: false,
        },
        { name: 'lastName', type: 'varchar', length: '20' },
        { name: 'password', type: 'varchar' },
        { name: 'createdAt', type: 'timestamptz', default: 'NOW()' },
        { name: 'updatedAt', type: 'timestamptz', default: 'NOW()' },
      ],
    });
    await queryRunner.createTable(userTable, true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users');
  }
}
