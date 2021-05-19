import { getRepository, Repository } from 'typeorm';

import ICreateAddressDTO from '../../../dtos/ICreateAddressDTO';
import IAddressRepository from '../../../repositories/IAddressRepository';
import Address from '../entities/Address';

class AddressRepository implements IAddressRepository {
  private repository: Repository<Address>;
  constructor() {
    this.repository = getRepository(Address);
  }
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
    const newAddress = this.repository.create({
      id,
      address,
      number,
      complement,
      zipCode,
      city,
      state,
      user_id,
    });
    await this.repository.save(newAddress);

    return newAddress;
  }
  async findById(id: string): Promise<Address> {
    const address = await this.repository.findOne(id);
    return address;
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default AddressRepository;
