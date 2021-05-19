import AppError from '../../../../shared/errors/AppError';
import { Gender } from '../../dtos/ICreateUserDTO';
import UsersRepositoryInMemory from '../../repositories/in-memory/UsersRepositoryInMemory';
import CreateUserUseCase from '../createUser/CreateUserUseCase';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

let createUserUseCase: CreateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it('should be able to authenticate an user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Jon Doe',
      age: 22,
      gender: 'preto' as Gender,
      phone: '(637) 650-2468',
      weight: 165,
      email: 'jondoe@exemple.com',
      password: '1234',
    });

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: '1234',
    });

    expect(response).toHaveProperty('token');
  });
  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'jon@exemple.com',
        password: '123456',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
  it('should not be able to authenticate with incorrect password', async () => {
    const user = await createUserUseCase.execute({
      name: 'Jon Doe',
      age: 22,
      gender: 'preto' as Gender,
      phone: '(637) 650-2468',
      weight: 165,
      email: 'jondoe@exemple.com',
      password: '1234',
    });
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: '12345',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
});
