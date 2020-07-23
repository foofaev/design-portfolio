import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import _ from 'lodash';
import helpers from '../libs/helpers';
import FileReference from './FileReference'; // eslint-disable-line import/no-cycle

// TODO: remove processing logic entity (ddd branch)
@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { transformer: { to: _.toLower.bind(null), from: _.identity.bind(null) } })
  email: string;

  @Column('varchar', { transformer: { to: _.trim.bind(null), from: _.identity.bind(null) } })
  firstName: string;

  @Column('varchar', { transformer: { to: _.trim.bind(null), from: _.identity.bind(null) } })
  lastName: string;

  @Column('varchar', { transformer: { to: _.trim.bind(null), from: _.identity.bind(null) } })
  about: string;

  @Column('varchar', { transformer: { to: _.trim.bind(null), from: _.identity.bind(null) } })
  description: string;

  @Column('varchar')
  facebookLink: string;

  @Column('varchar')
  vkLink: string;

  @Column('varchar')
  instagramLink: string;

  @OneToOne(() => FileReference, (fileRef) => fileRef.item, { eager: true })
  @JoinColumn()
  image: FileReference;

  @Column('varchar', { transformer: { to: helpers.hashPassword, from: _.identity.bind(null) } })
  password: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export type UserOutput = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  about: string;
  description: string;
  facebookLink: string;
  instagramLink: string;
  vkLink: string;
  image: File[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};
