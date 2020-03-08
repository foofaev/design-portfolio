import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from './User';

@Entity('sessions')
export default class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamptz')
  expiresAt: string;

  @Column('varchar')
  ip: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
