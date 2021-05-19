import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import IAddressRepository from '../../repositories/IAddressRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteAddressUseCase {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<void> {
    const address = await this.addressRepository.findById(id);

    if (!address) {
      throw new AppError('Address not exists!');
    }
    if (address.user_id !== user_id) {
      throw new AppError('Operation not allowed');
    }
    await this.addressRepository.delete(id);
  }
}
export default DeleteAddressUseCase;
