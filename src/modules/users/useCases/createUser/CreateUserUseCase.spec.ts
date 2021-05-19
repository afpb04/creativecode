import AppError from '../../../../shared/errors/AppError';
import { Gender } from '../../dtos/ICreateUserDTO';
import UsersRepositoryInMemory from '../../repositories/in-memory/UsersRepositoryInMemory';
import CreateUserUseCase from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Jon Doe',
      age: 22,
      gender: 'preto' as Gender,
      phone: '(637) 650-2468',
      weight: 165,
      email: 'jondoe@exemple.com',
      password: '1234',
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with exists same e-mail', async () => {
    await createUserUseCase.execute({
      name: 'Jon Doe',
      age: 22,
      gender: 'preto' as Gender,
      phone: '(637) 650-2468',
      weight: 165,
      email: 'jondoe@exemple.com',
      password: '1234',
    });
    await expect(
      createUserUseCase.execute({
        name: 'Jon Doe',
        age: 22,
        gender: 'preto' as Gender,
        phone: '(637) 650-2468',
        weight: 165,
        email: 'jondoe@exemple.com',
        password: '1234',
      }),
    ).rejects.toEqual(new AppError('Email already exists!'));
  });
});
