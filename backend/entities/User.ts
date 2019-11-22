import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import File from './File'; // eslint-disable-line import/no-cycle

const hashPassword = (value:string) => bcrypt.hashSync(value, 8);

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(() => File)
  image: File;

  set password(value: string) {
    this.password = hashPassword(value);
  }

  @Column()
  get password(): string {
    return this.password;
  }

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  verifyPassword(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
