import { container } from 'tsyringe';

import AddressRepository from '../../modules/address/infra/typeorm/repositories/AddressRepository';
import IAddressRepository from '../../modules/address/repositories/IAddressRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../../modules/users/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
);
