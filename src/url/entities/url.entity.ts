/* eslint-disable prettier/prettier */


// src/modules/url/url.entity.ts
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

  @Column({ name: 'userId' })
  userId: number;

  // @ManyToOne(() => User, { referencedColumnName: 'id' })
  // @JoinColumn({ name: 'userId' })
  // user: User;
}

