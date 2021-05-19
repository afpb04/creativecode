import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import Address from '../../../../address/infra/typeorm/entities/Address';

enum Gender {
  BRANCO = 'branco',
  PRETO = 'preto',
  PARDO = 'pardo',
  AMARELO = 'amarelo',
  INDIGENA = 'indigena',
}

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  weight: number;

  @Column()
  gender: Gender;

  @Column()
  @Exclude()
  password: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Address, address => address.user, {
    eager: true,
  })
  address: Address[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default User;
