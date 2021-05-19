import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

interface IUsersRepository {
  create({
    id,
    name,
    email,
    age,
    phone,
    weight,
    gender,
    password,
  }: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  delete(id: string): Promise<void>;
  list(): Promise<User[]>;
}

export default IUsersRepository;
