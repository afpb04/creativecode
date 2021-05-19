import ICreateAddressDTO from '../../dtos/ICreateAddressDTO';
import Address from '../../infra/typeorm/entities/Address';
import IAddressRepository from '../IAddressRepository';

class AddressRepositoryInMemory implements IAddressRepository {
  private addressInMemory: Address[] = [];

  async create({
    id,
    address,
    number,
    complement,
    zipCode,
    city,
    state,
    user_id,
  }: ICreateAddressDTO): Promise<Address> {
    const newAddress = new Address();
    Object.assign(newAddress, {
      id,
      address,
      number,
      complement,
      zipCode,
      city,
      state,
      user_id,
    });
    this.addressInMemory.push(newAddress);
    return newAddress;
  }
  async findById(id: string): Promise<Address> {
    return this.addressInMemory.find(address => address.id === id);
  }
  async delete(id: string): Promise<void> {
    const addressIndex = this.addressInMemory.findIndex(
      address => address.id === id,
    );
    this.addressInMemory.splice(addressIndex, 1);
  }
}

export default AddressRepositoryInMemory;
