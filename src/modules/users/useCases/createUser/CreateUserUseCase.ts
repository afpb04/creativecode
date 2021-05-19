import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

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
  name: string;
  phone: string;
  email: string;
  age: number;
  weight: number;
  gender: Gender;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    phone,
    email,
    age,
    weight,
    gender,
    password,
  }: IRequest): Promise<User> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError('Email already exists!');
    }
    const passwordHash = await hash(password, 8);
    const user = await this.usersRepository.create({
      name,
      phone,
      email,
      age,
      weight,
      gender,
      password: passwordHash,
    });
    return user;
  }
}
export default CreateUserUseCase;
