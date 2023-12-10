/* eslint-disable prettier/prettier */

import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalUrl: string;

  @Column()
  shortUrl: string;

  @ManyToOne(() => User, user => user.urls)
  @JoinColumn({ name: 'userId' })
  user: User;
}

