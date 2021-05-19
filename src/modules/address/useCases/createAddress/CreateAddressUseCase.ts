import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import IUsersRepository from '../../../users/repositories/IUsersRepository';
import Address from '../../infra/typeorm/entities/Address';
import IAddressRepository from '../../repositories/IAddressRepository';

interface IRequest {
  address: string;
  number: number;
  complement: string;
  zipCode: string;
  city: string;
  state: string;
  user_id: string;
}

@injectable()
class CreateAddressUseCase {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({
    address,
    number,
    complement,
    zipCode,
    city,
    state,
    user_id,
  }: IRequest): Promise<Address> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User does not exists!');
    }
    const newAddress = await this.addressRepository.create({
      address,
      number,
      complement,
      zipCode,
      city,
      state,
      user_id,
    });
    return newAddress;
  }
}
export default CreateAddressUseCase;
