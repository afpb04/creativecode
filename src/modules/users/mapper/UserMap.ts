import { classToClass } from 'class-transformer';

import IUserResponseDTO from '../dtos/IUserResponseDTO';
import User from '../infra/typeorm/entities/User';

class UserMap {
  static toDTO({
    id,
    name,
    email,
    phone,
    age,
    gender,
    weight,
    address,
  }: User): IUserResponseDTO {
    const user = classToClass({
      id,
      name,
      email,
      phone,
      age,
      gender,
      weight,
      address,
    });
    return user;
  }
}

export default UserMap;
