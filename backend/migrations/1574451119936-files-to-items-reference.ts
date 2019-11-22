import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export default class filesToItemsReference1574451119936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn('user', new TableColumn({
      name: 'imageId',
      type: 'uuid',
    }));

    await queryRunner.createForeignKey('user', new TableForeignKey({
      columnNames: ['imageId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'file',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.addColumn('project', new TableColumn({
      name: 'imageId',
      type: 'uuid',
    }));

    await queryRunner.createForeignKey('project', new TableForeignKey({
      columnNames: ['imageId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'file',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.addColumn('project', new TableColumn({
      name: 'previewImageId',
      type: 'uuid',
    }));

    await queryRunner.createForeignKey('project', new TableForeignKey({
      columnNames: ['previewImageId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'file',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('file', new TableForeignKey({
      columnNames: ['itemId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'project',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const userTable = await queryRunner.getTable('user');
    if (!userTable) return;
    const userImageId = userTable.foreignKeys.find((fk) => fk.columnNames.indexOf('imageId') !== -1);

    if (userImageId) await queryRunner.dropForeignKey('user', userImageId);
    await queryRunner.dropColumn('user', 'imageId');

    const projectTable = await queryRunner.getTable('project');
    if (!projectTable) return;
    const projectImageId = projectTable.foreignKeys.find((fk) => fk.columnNames.indexOf('imageId') !== -1);
    if (projectImageId) await queryRunner.dropForeignKey('project', projectImageId);
    await queryRunner.dropColumn('project', 'imageId');

    const projectPreviewImageId = projectTable.foreignKeys.find((fk) => fk.columnNames.indexOf('previewImageId') !== -1);
    if (projectPreviewImageId) await queryRunner.dropForeignKey('project', projectPreviewImageId);
    await queryRunner.dropColumn('project', 'previewImageId');

    const fileTable = await queryRunner.getTable('file');
    if (!fileTable) return;
    const fileItemId = projectTable.foreignKeys.find((fk) => fk.columnNames.indexOf('itemId') !== -1);
    if (fileItemId) await queryRunner.dropForeignKey('file', fileItemId);
  }
}
