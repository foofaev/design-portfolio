import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import FileReference from './FileReference'; // eslint-disable-line import/no-cycle

const PROJECT_TYPES = ['render'];

// ProjectType = 'render' | 'project' | 'schema' | 'art';
export type ProjectType = 'render';

@Entity('projects')
export default class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { unique: true, nullable: true })
  urlKey: string;

  @Column('boolean', { default: true })
  isVisible: boolean;

  @Column({ type: 'enum', enum: PROJECT_TYPES, default: 'render' })
  type: ProjectType;

  @Column('timestamptz', { nullable: true })
  publishedAt: string;

  @OneToOne(() => FileReference, (fileRef) => fileRef.item)
  @JoinColumn()
  image: FileReference;

  @OneToOne(() => FileReference, (fileRef) => fileRef.item)
  @JoinColumn()
  previewImage: FileReference;

  @OneToMany(() => Project, (project) => project.files)
  @JoinColumn()
  files: FileReference[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
