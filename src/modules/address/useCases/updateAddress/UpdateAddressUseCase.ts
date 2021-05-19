import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import Address from '../../infra/typeorm/entities/Address';
import IAddressRepository from '../../repositories/IAddressRepository';

interface IRequest {
  id: string;
  address: string;
  number: number;
  complement: string;
  zipCode: string;
  city: string;
  state: string;
  user_id: string;
}

@injectable()
class UpdateAddressUseCase {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}
  async execute({
    id,
    address,
    number,
    complement,
    zipCode,
    city,
    state,
    user_id,
  }: IRequest): Promise<Address> {
    const addressExists = await this.addressRepository.findById(id);

    if (!addressExists) {
      throw new AppError('Address does not exists!');
    }
    if (addressExists.user_id !== user_id) {
      throw new AppError('Operation not allowed!');
    }
    addressExists.address = address;
    addressExists.number = number;
    addressExists.complement = complement;
    addressExists.zipCode = zipCode;
    addressExists.city = city;
    addressExists.state = state;

    await this.addressRepository.create(addressExists);
    return addressExists;
  }
}
export default UpdateAddressUseCase;
