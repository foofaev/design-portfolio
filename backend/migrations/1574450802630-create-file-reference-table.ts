import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateFileReferencesTable1574450802622 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const fileTable = new Table({
      name: 'file_references',
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
        { name: 'num', type: 'int', isNullable: false },
        { name: 'itemType', type: 'varchar', length: '20' },
        { name: 'purpose', type: 'varchar', length: '20' },
        { name: 'filePath', type: 'varchar', isNullable: false },
        { name: 'contentType', type: 'varchar', isNullable: false, default: '\'\'' },
        { name: 'ord', type: 'int', isNullable: false, default: 0 },
        { name: 'itemId', type: 'uuid', isNullable: false },
        { name: 'fileId', type: 'uuid', isNullable: false },
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

    await queryRunner.createForeignKey('file_references', new TableForeignKey({
      columnNames: ['num'],
      referencedColumnNames: ['num'],
      referencedTableName: 'files',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('file_references');
  }
}
