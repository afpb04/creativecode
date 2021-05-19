import { v4 as uuid } from 'uuid';

import AppError from '../../../../shared/errors/AppError';
import { Gender } from '../../dtos/ICreateUserDTO';
import UsersRepositoryInMemory from '../../repositories/in-memory/UsersRepositoryInMemory';
import UpdateUserUseCase from './UpdateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let updateUserUseCase: UpdateUserUseCase;

describe('UpdateProfile', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    updateUserUseCase = new UpdateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to update the profile', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'Jon Doe',
      age: 22,
      gender: 'preto' as Gender,
      phone: '(637) 650-2468',
      weight: 165,
      email: 'jondoe@exemple.com',
      password: '1234',
    });

    const updatedUser = await updateUserUseCase.execute({
      id: user.id,
      name: 'John Trê',
      age: 22,
      gender: 'preto' as Gender,
      phone: '(637) 650-2468',
      weight: 165,
      email: 'johntre@example.com',
      password: '1234',
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('johntre@example.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateUserUseCase.execute({
        id: uuid(),
        name: 'Jon Doe',
        age: 22,
        gender: 'preto' as Gender,
        phone: '(637) 650-2468',
        weight: 165,
        email: 'jondoe@exemple.com',
        password: '1234',
      }),
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should not be able to change to another user email', async () => {
    await usersRepositoryInMemory.create({
      name: 'Jon Doe',
      age: 22,
      gender: 'preto' as Gender,
      phone: '(637) 650-2468',
      weight: 165,
      email: 'jondoe@exemple.com',
      password: '1234',
    });

    const user = await usersRepositoryInMemory.create({
      name: 'Jon Doe',
      age: 22,
      gender: 'preto' as Gender,
      phone: '(637) 650-2468',
      weight: 165,
      email: 'teste@example.com',
      password: '1234',
    });

    await expect(
      updateUserUseCase.execute({
        id: user.id,
        name: 'John Doe',
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
