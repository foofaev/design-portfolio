import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class createSessionTable1574450753370 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const sessionTable = new Table({
      name: 'session',
      columns: [
        {
          name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid',
        },
        { name: 'userId', type: 'uuid' },
        { name: 'expiresAt', type: 'timestamptz', isNullable: false },
        { name: 'createdAt', type: 'timestamptz', default: 'NOW()' },
        { name: 'updatedAt', type: 'timestamptz', default: 'NOW()' },
      ],
    });
    await queryRunner.createTable(sessionTable, true);

    await queryRunner.createForeignKey('session', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('session');
  }
}
