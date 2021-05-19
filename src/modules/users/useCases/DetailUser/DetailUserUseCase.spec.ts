import { v4 as uuid } from 'uuid';

import AppError from '../../../../shared/errors/AppError';
import { Gender } from '../../dtos/ICreateUserDTO';
import UsersRepositoryInMemory from '../../repositories/in-memory/UsersRepositoryInMemory';
import DetailUserUseCase from './DetailUserUseCase';

let detailUserUseCase: DetailUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Detail a User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    detailUserUseCase = new DetailUserUseCase(usersRepositoryInMemory);
  });
  it('should be able to show the profile', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'Jon Doe',
      age: 22,
      gender: 'preto' as Gender,
      phone: '(637) 650-2468',
      weight: 165,
      email: 'jondoe@exemple.com',
      password: '1234',
    });
    const profile = await detailUserUseCase.execute(user.id);
    expect(profile.name).toBe('Jon Doe');
    expect(profile.email).toBe('jondoe@exemple.com');
  });
  it('should not be able to show the profile from non-existing user', async () => {
    await expect(detailUserUseCase.execute(uuid())).rejects.toEqual(
      new AppError('User does not exists!'),
    );
  });
});
