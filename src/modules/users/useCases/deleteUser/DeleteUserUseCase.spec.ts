import { v4 as uuid } from 'uuid';

import AppError from '../../../../shared/errors/AppError';
import { Gender } from '../../dtos/ICreateUserDTO';
import UsersRepositoryInMemory from '../../repositories/in-memory/UsersRepositoryInMemory';
import DeleteUserUseCase from './DeleteUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let deleteUserUseCase: DeleteUserUseCase;

describe('Delete a User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    deleteUserUseCase = new DeleteUserUseCase(usersRepositoryInMemory);
  });
  it('should be able to delete a user', async () => {
    const deleteUser = spyOn(deleteUserUseCase, 'execute');
    const { id } = await usersRepositoryInMemory.create({
      name: 'Jon Doe',
      age: 22,
      gender: 'preto' as Gender,
      phone: '(637) 650-2468',
      weight: 165,
      email: 'jondoe@exemple.com',
      password: '1234',
    });
    await deleteUserUseCase.execute(id);
    expect(deleteUser).toHaveBeenCalled();
  });
  it('should not be able to delete a nonexistent user', async () => {
    await expect(deleteUserUseCase.execute(uuid())).rejects.toEqual(
      new AppError('User does not exists'),
    );
  });
});
