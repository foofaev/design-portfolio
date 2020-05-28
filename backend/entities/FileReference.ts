import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
  OneToOne, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import Project from './Project'; // eslint-disable-line import/no-cycle
import User from './User'; // eslint-disable-line import/no-cycle
import File from './File'; // eslint-disable-line import/no-cycle

const ITEM_TYPES = ['project', 'user'];

export type ItemType = 'project' | 'user';

@Entity('file_references')
export default class FileReference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  num: number;

  @Column({ type: 'enum', enum: ITEM_TYPES })
  itemType: ItemType;

  @Column('varchar')
  purpose: string;

  @Column('uuid', { nullable: true })
  itemId: string;

  @OneToOne(() => Project, (project) => project.mainImage)
  @OneToOne(() => Project, (project) => project.draft)
  @ManyToOne(() => Project, (project) => project.images)
  @OneToOne(() => User, (user) => user.image)
  @JoinColumn()
  item: Project | User;

  @ManyToOne(() => File)
  @JoinColumn()
  file: File;

  @Column('varchar')
  filePath: string;

  @Column('int', { nullable: false, default: 0 })
  ord: number;

  @Column('varchar')
  contentType: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export type FileReferenceOutput = {
  id: string;
  num: number;
  filePath: string;
  ord: number;
  contentType: string;
  url: string;
};
