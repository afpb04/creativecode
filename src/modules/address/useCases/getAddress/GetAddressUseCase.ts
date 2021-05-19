import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import Address from '../../infra/typeorm/entities/Address';
import IAddressRepository from '../../repositories/IAddressRepository';

@injectable()
class GetAddressUseCase {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}
  async execute(id: string): Promise<Address> {
    const address = await this.addressRepository.findById(id);

    if (!address) {
      throw new AppError('Address does not exists!');
    }
    return address;
  }
}
export default GetAddressUseCase;
