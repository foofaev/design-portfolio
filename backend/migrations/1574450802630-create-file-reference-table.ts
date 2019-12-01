import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class createFileReferencesTable1574450802622 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const fileTable = new Table({
      name: 'file_references',
      columns: [
        {
          name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid',
        },
        {
          name: 'num', type: 'int', isGenerated: true, generationStrategy: 'increment', isUnique: true,
        },
        { name: 'itemType', type: 'varchar', length: '20' },
        { name: 'purpose', type: 'varchar', length: '20' },
        { name: 'filePath', type: 'varchar', isNullable: false },
        {
          name: 'contentType', type: 'varchar', isNullable: false, default: '\'\'',
        },
        { name: 'ord', type: 'int', isNullable: true },
        {
          name: 'itemId', type: 'uuid', isNullable: false, default: null,
        },
        {
          name: 'fileId', type: 'uuid', isNullable: false, default: null,
        },
        { name: 'createdAt', type: 'timestamptz', default: 'NOW()' },
        { name: 'updatedAt', type: 'timestamptz', default: 'NOW()' },
      ],
    });
    await queryRunner.createTable(fileTable, true);

    await queryRunner.createForeignKey('file_references', new TableForeignKey({
      columnNames: ['fileId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'files',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('file_references');
  }
}
