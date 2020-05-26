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
import FileReference, { FileReferenceOutput } from './FileReference'; // eslint-disable-line import/no-cycle

const PROJECT_TYPES = ['render', 'fullProject', 'stainedGlass'];

// ProjectType = 'render' | 'project' | 'schema' | 'art';
export type ProjectType = 'render' | 'fullProject' | 'stainedGlass';

@Entity('projects')
export default class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  subtitle: string;

  @Column('text', { nullable: true })
  preview: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { unique: true, nullable: true })
  urlKey: string;

  @Column('boolean', { default: true })
  isVisible: boolean;

  @Column({ type: 'enum', enum: PROJECT_TYPES, default: 'fullProject' })
  type: ProjectType;

  @Column('timestamptz', { nullable: true })
  publishedAt: string;

  imageUrl?: string;

  draftUrl?: string;

  @Column('float')
  square: number;

  @Column('smallint')
  tenants: number;

  @Column('smallint')
  rooms: number;

  @OneToOne(() => FileReference, (fileRef) => fileRef.item)
  @JoinColumn()
  mainImage: FileReference;

  @OneToOne(() => FileReference, (fileRef) => fileRef.item)
  @JoinColumn()
  draft: FileReference;

  @OneToMany(() => FileReference, (fileRef) => fileRef.item)
  @JoinColumn()
  images: FileReference[];

  @Column('int', { nullable: false, default: 0 })
  ord: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export type ProjectOutput = {
  id: string;
  title: string;
  subtitle: string;
  preview: string;
  description: string;
  square: number;
  tenants: number;
  rooms: number;
  urlKey: string;
  isVisible: boolean;
  type: ProjectType;
  publishedAt: string;
  draftUrl: string;
  imageUrl: string;
  images: string[];
  files: FileReferenceOutput[];
  ord: number;
  createdAt: string;
  updatedAt: string;
};
