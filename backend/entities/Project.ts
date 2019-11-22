import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import File from './File'; // eslint-disable-line import/no-cycle

const PROJECT_TYPES = ['render'];

// ProjectType = 'render' | 'project' | 'schema' | 'art';
export type ProjectType = 'render';

@Entity()
export default class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  urlKey: string;

  @Column()
  isVisible: boolean;

  @Column({ type: 'enum', enum: PROJECT_TYPES, default: 'render' })
  type: ProjectType;

  @Column('timestamptz')
  publishedAt: string;

  @OneToOne(() => File)
  previewImage: File;

  @OneToOne(() => File)
  image: File;

  @OneToMany(() => File, (file: File) => file.item)
  files: File[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
