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

  @Column('varchar')
  description: string;

  @Column('varchar')
  urlKey: string;

  @Column('boolean')
  isVisible: boolean;

  @Column({ type: 'enum', enum: PROJECT_TYPES, default: 'render' })
  type: ProjectType;

  @Column('timestamptz')
  publishedAt: string;

  @OneToOne(() => FileReference)
  @JoinColumn()
  previewImage: FileReference;

  @OneToOne(() => FileReference)
  @JoinColumn()
  image: FileReference;

  @OneToMany(() => FileReference, (fileRef: FileReference) => fileRef.item)
  @JoinColumn()
  files: FileReference[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
