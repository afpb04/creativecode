import { v4 as uuid } from 'uuid';

import AddressRepositoryInMemory from '../../repositories/in-memory/AddressRepositoryInMemory';
import UpdateAddressUseCase from './UpdateAddressUseCase';

let addressRepositoryInMemory: AddressRepositoryInMemory;
let updateAddressUseCase: UpdateAddressUseCase;

describe('UpdateAddress', () => {
  beforeEach(() => {
    addressRepositoryInMemory = new AddressRepositoryInMemory();

    updateAddressUseCase = new UpdateAddressUseCase(addressRepositoryInMemory);
  });

  it('should be able to update the Address', async () => {
    const address = await addressRepositoryInMemory.create({
      address: 'test',
      number: 1,
      city: 'test',
      complement: 'test',
      state: 'test',
      zipCode: '12234-12',
      user_id: uuid(),
    });

    const updatedAddress = await updateAddressUseCase.execute({
      id: address.id,
      address: 'test1',
      number: 1,
      city: 'test',
      complement: 'test',
      state: 'test',
      zipCode: '12234-12',
      user_id: address.user_id,
    });

    expect(updatedAddress.address).toBe('test1');
  });
});
