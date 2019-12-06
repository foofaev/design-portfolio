import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import helpers from '../libs/helpers';
import FileReference from './FileReference'; // eslint-disable-line import/no-cycle


@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  _password: string;

  _email: string;

  @Column('varchar')
  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value.toLowerCase();
  }

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @OneToOne(() => FileReference, (fileRef) => fileRef.item)
  @JoinColumn()
  image: FileReference;

  @Column('varchar')
  get password(): string {
    return this._password;
  }

  set password(value: string) {
    /* this.password = helpers.hashPassword(value); */
    this._password = value;
  }

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
