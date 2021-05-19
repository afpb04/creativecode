import { v4 as uuid } from 'uuid';

import AppError from '../../../../shared/errors/AppError';
import { Gender } from '../../dtos/ICreateUserDTO';
import UsersRepositoryInMemory from '../../repositories/in-memory/UsersRepositoryInMemory';
import ProfileUserUseCase from './ProfileUserUseCase';

let profileUserUseCase: ProfileUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Detail a User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    profileUserUseCase = new ProfileUserUseCase(usersRepositoryInMemory);
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
    const profile = await profileUserUseCase.execute(user.id);
    expect(profile.name).toBe('Jon Doe');
    expect(profile.email).toBe('jondoe@exemple.com');
  });
  it('should not be able to show the profile from non-existing user', async () => {
    await expect(profileUserUseCase.execute(uuid())).rejects.toEqual(
      new AppError('User does not exists!'),
    );
  });
});
