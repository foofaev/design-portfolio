import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';

export default class createFileTable1574450802622 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const fileTable = new Table({
      name: 'files',
      columns: [
        {
          name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid',
        },
        { name: 'name', type: 'varchar' },
        {
          name: 'num', type: 'int', isGenerated: true, generationStrategy: 'increment', isUnique: true,
        },
        {
          name: 'filePath', type: 'varchar', isNullable: false, isUnique: true,
        },
        {
          name: 'contentType', type: 'varchar', isNullable: false, default: '\'\'',
        },
        { name: 'size', type: 'int', isNullable: false },
        {
          name: 'md5', type: 'varchar', isNullable: false, isUnique: true,
        },
        { name: 'createdAt', type: 'timestamptz', default: 'NOW()' },
        { name: 'updatedAt', type: 'timestamptz', default: 'NOW()' },
      ],
    });
    await queryRunner.createTable(fileTable, true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('files');
  }
}
