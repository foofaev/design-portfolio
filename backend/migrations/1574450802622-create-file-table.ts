import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';

export default class createFileTable1574450802622 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const fileTable = new Table({
      name: 'file',
      columns: [
        {
          name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid',
        },
        { name: 'filePath', type: 'varchar', isNullable: false },
        {
          name: 'contentType', type: 'varchar', isNullable: false, default: '\'\'',
        },
        { name: 'ord', type: 'int', isNullable: true },
        {
          name: 'itemId', type: 'uuid', isNullable: false, default: null,
        },
        {
          name: 'urlKey', type: 'varchar', isUnique: true, isNullable: true, default: null,
        },
        { name: 'itemType', type: 'varchar', length: '20' },
        { name: 'createdAt', type: 'timestamptz', default: 'NOW()' },
        { name: 'updatedAt', type: 'timestamptz', default: 'NOW()' },
      ],
    });
    await queryRunner.createTable(fileTable, true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('file');
  }
}
