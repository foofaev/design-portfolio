import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('files')
export default class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  size: number;

  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  md5: string;

  @Column('varchar', { unique: true })
  filePath: string;

  @Column('varchar')
  contentType: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
