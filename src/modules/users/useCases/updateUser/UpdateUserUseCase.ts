import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../../repositories/IUsersRepository';

enum Gender {
  BRANCO = 'branco',
  PRETO = 'preto',
  PARDO = 'pardo',
  AMARELO = 'amarelo',
  INDIGENA = 'indigena',
}

interface IRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  age: number;
  weight: number;
  gender: Gender;
  password: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({
    id,
    name,
    email,
    phone,
    age,
    weight,
    gender,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exists!');
    }
    const emailAlreadyExist = await this.usersRepository.findByEmail(email);

    if (email !== user.email && emailAlreadyExist) {
      throw new AppError('Email already exists!');
    }

    const passwordHash = await hash(password, 8);

    user.name = name;
    user.phone = phone;
    user.age = age;
    user.weight = weight;
    user.gender = gender;
    user.password = passwordHash;
    user.email = email;

    await this.usersRepository.create(user);

    return user;
  }
}

export default UpdateUserUseCase;
