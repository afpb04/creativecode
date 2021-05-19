import { v4 as uuid } from 'uuid';

import AppError from '../../../../shared/errors/AppError';
import AddressRepositoryInMemory from '../../repositories/in-memory/AddressRepositoryInMemory';
import GetAddressUseCase from './GetAddressUseCase';

let getAddressUseCase: GetAddressUseCase;
let addressRepositoryInMemory: AddressRepositoryInMemory;

describe('Detail a User', () => {
  beforeEach(() => {
    addressRepositoryInMemory = new AddressRepositoryInMemory();
    getAddressUseCase = new GetAddressUseCase(addressRepositoryInMemory);
  });
  it('should be able to show the profile', async () => {
    const address = await addressRepositoryInMemory.create({
      address: 'test',
      number: 1,
      city: 'test',
      complement: 'test',
      state: 'test',
      zipCode: '12234-12',
      user_id: uuid(),
    });
    const getAddress = await getAddressUseCase.execute(address.id);
    expect(getAddress.address).toBe('test');
  });
  it('should not be able to show the address from non-existing address', async () => {
    await expect(getAddressUseCase.execute(uuid())).rejects.toEqual(
      new AppError('Address does not exists!'),
    );
  });
});
