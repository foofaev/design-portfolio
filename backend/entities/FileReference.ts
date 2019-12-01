import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
  OneToOne, CreateDateColumn, UpdateDateColumn, Generated,
} from 'typeorm';
import Project from './Project'; // eslint-disable-line import/no-cycle
import User from './User'; // eslint-disable-line import/no-cycle
import File from './File';

const ITEM_TYPES = ['project', 'user'];

export type ItemType = 'project' | 'user';

@Entity('file_references')
export default class FileReference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  num: number;

  @Column({ type: 'enum', enum: ITEM_TYPES })
  itemType: ItemType;

  @Column('varchar')
  purpose: string;

  @OneToOne(() => Project, (project) => project.image)
  @OneToOne(() => Project, (project) => project.previewImage)
  @ManyToOne(() => Project, (project) => project.files)
  @OneToOne(() => User, (user) => user.image)
  @JoinColumn()
  item: Project | User;

  @ManyToOne(() => File)
  @JoinColumn()
  file: File;

  @Column('varchar')
  filePath: string;

  @Column('int', { nullable: true })
  ord: number;

  @Column('varchar')
  contentType: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
