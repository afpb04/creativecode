import { v4 as uuid } from 'uuid';

import AppError from '../../../../shared/errors/AppError';
import AddressRepositoryInMemory from '../../repositories/in-memory/AddressRepositoryInMemory';
import DeleteAddressUseCase from './DeleteAddressUseCase';

let addressRepositoryInMemory: AddressRepositoryInMemory;
let deleteAddressUseCase: DeleteAddressUseCase;

describe('Delete a address', () => {
  beforeEach(() => {
    addressRepositoryInMemory = new AddressRepositoryInMemory();
    deleteAddressUseCase = new DeleteAddressUseCase(addressRepositoryInMemory);
  });
  it('should be able to delete a address', async () => {
    const deleteUser = spyOn(deleteAddressUseCase, 'execute');
    const { id, user_id } = await addressRepositoryInMemory.create({
      address: 'test',
      number: 1,
      city: 'test',
      complement: 'test',
      state: 'test',
      zipCode: '12234-12',
      user_id: uuid(),
    });
    await deleteAddressUseCase.execute({ id, user_id });
    expect(deleteUser).toHaveBeenCalled();
  });
  it('should not be able to delete a nonexistent address', async () => {
    const id = uuid();
    await expect(
      deleteAddressUseCase.execute({ id, user_id: id }),
    ).rejects.toEqual(new AppError('Address not exists!'));
  });
});
