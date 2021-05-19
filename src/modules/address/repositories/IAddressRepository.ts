import ICreateAddressDTO from '../dtos/ICreateAddressDTO';
import Address from '../infra/typeorm/entities/Address';

interface IAddressRepository {
  create({
    id,
    address,
    number,
    complement,
    zipCode,
    city,
    state,
    user_id,
  }: ICreateAddressDTO): Promise<Address>;
  findById(id: string): Promise<Address>;
  delete(id: string): Promise<void>;
}

export default IAddressRepository;
