import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';

export default class CreateProjectTable1574450769363 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE project_types as enum('render', 'stainedGlass', 'fullProject');
    `);

    const projectTable = new Table({
      name: 'projects',
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
        { name: 'title', type: 'varchar', isNullable: false },
        { name: 'subtitle', type: 'varchar', isNullable: true },
        { name: 'preview', type: 'text', isNullable: true },
        { name: 'description', type: 'text', isNullable: true },
        { name: 'square', type: 'float', isNullable: true, default: null },
        { name: 'tenants', type: 'smallint', isNullable: true, default: null },
        { name: 'rooms', type: 'smallint', isNullable: true, default: null },
        { name: 'urlKey', type: 'varchar', isUnique: true, isNullable: false },
        { name: 'isVisible', type: 'boolean', isNullable: false, default: true },
        { name: 'type', type: 'project_types', default: '\'render\'' },
        { name: 'ord', type: 'int', isNullable: false, default: 0 },
        { name: 'publishedAt', type: 'timestamptz', isNullable: true, default: null },
        { name: 'createdAt', type: 'timestamptz', default: 'NOW()' },
        { name: 'updatedAt', type: 'timestamptz', default: 'NOW()' },
      ],
    });
    await queryRunner.createTable(projectTable, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('projects');
  }
}
