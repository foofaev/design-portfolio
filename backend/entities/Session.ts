import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

import User from './User';

@Entity()
export default class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamptz')
  expiresAt: string;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
