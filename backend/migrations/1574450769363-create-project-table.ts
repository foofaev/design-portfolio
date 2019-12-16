import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';

export default class createProjectTable1574450769363 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TYPE project_types as enum('render');
    `);

    const projectTable = new Table({
      name: 'projects',
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
        { name: 'title', type: 'varchar', isNullable: false },
        { name: 'description', type: 'text', isNullable: true },
        { name: 'urlKey', type: 'varchar', isUnique: true, isNullable: true, default: null },
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

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('projects');
  }
}
