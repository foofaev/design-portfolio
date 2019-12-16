import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export default class filesToItemsReference1574451119936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'imageId',
      type: 'uuid',
      isNullable: true,
    }));

    await queryRunner.createForeignKey('users', new TableForeignKey({
      columnNames: ['imageId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'file_references',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.addColumn('projects', new TableColumn({
      name: 'imageId',
      type: 'uuid',
      isNullable: true,
    }));

    await queryRunner.createForeignKey('projects', new TableForeignKey({
      columnNames: ['imageId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'file_references',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('file_references', new TableForeignKey({
      columnNames: ['itemId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'projects',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const userTable = await queryRunner.getTable('users');
    if (!userTable) return;
    const userImageId = userTable.foreignKeys.find((fk) => fk.columnNames.indexOf('imageId') !== -1);

    if (userImageId) await queryRunner.dropForeignKey('users', userImageId);
    await queryRunner.dropColumn('users', 'imageId');

    const projectTable = await queryRunner.getTable('projects');
    if (!projectTable) return;
    const projectImageId = projectTable.foreignKeys.find((fk) => fk.columnNames.indexOf('imageId') !== -1);
    if (projectImageId) await queryRunner.dropForeignKey('projects', projectImageId);
    await queryRunner.dropColumn('projects', 'imageId');

    const fileTable = await queryRunner.getTable('file_references');
    if (!fileTable) return;
    const fileItemId = projectTable.foreignKeys.find((fk) => fk.columnNames.indexOf('itemId') !== -1);
    if (fileItemId) await queryRunner.dropForeignKey('file_references', fileItemId);
  }
}
