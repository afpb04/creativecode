import { v4 as uuid } from 'uuid';

import AppError from '../../../../shared/errors/AppError';
import { Gender } from '../../../users/dtos/ICreateUserDTO';
import UsersRepositoryInMemory from '../../../users/repositories/in-memory/UsersRepositoryInMemory';
import AddressRepositoryInMemory from '../../repositories/in-memory/AddressRepositoryInMemory';
import CreateAddressUseCase from './CreateAddressUseCase';

let createAddressUseCase: CreateAddressUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;

describe('Create Address', () => {
  beforeEach(() => {
    addressRepositoryInMemory = new AddressRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createAddressUseCase = new CreateAddressUseCase(
      addressRepositoryInMemory,
      usersRepositoryInMemory,
    );
  });
  it('should be able to create a new address', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'Jon Doe',
      age: 22,
      gender: 'preto' as Gender,
      phone: '(637) 650-2468',
      weight: 165,
      email: 'jondoe@exemple.com',
      password: '1234',
    });
    const address = await createAddressUseCase.execute({
      address: 'test',
      number: 1,
      city: 'test',
      complement: 'test',
      state: 'test',
      zipCode: '12234-12',
      user_id: user.id,
    });
    expect(address).toHaveProperty('id');
  });
  it('should not be able to create a new address nonsexists user', async () => {
    await expect(
      createAddressUseCase.execute({
        address: 'test',
        number: 1,
        city: 'test',
        complement: 'test',
        state: 'test',
        zipCode: '12234-12',
        user_id: uuid(),
      }),
    ).rejects.toEqual(new AppError('User does not exists!'));
  });
});
