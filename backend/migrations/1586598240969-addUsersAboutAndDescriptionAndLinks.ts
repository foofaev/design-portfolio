import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UserAboutAndDescriptionAndLinks1586598240969 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'about',
      type: 'varchar(100)',
      isNullable: false,
      default: '\'\'',
    }));

    await queryRunner.addColumn('users', new TableColumn({
      name: 'description',
      type: 'text',
      isNullable: false,
      default: '\'\'',
    }));

    await queryRunner.addColumn('users', new TableColumn({
      name: 'facebookLink',
      type: 'varchar(255)',
      isNullable: false,
      default: '\'\'',
    }));
    await queryRunner.addColumn('users', new TableColumn({
      name: 'instagramLink',
      type: 'varchar(255)',
      isNullable: false,
      default: '\'\'',
    }));
    await queryRunner.addColumn('users', new TableColumn({
      name: 'vkLink',
      type: 'varchar(255)',
      isNullable: false,
      default: '\'\'',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'about');
    await queryRunner.dropColumn('users', 'description');
    await queryRunner.dropColumn('users', 'instagramLink');
    await queryRunner.dropColumn('users', 'facebookLink');
    await queryRunner.dropColumn('users', 'vkLink');
  }
}
