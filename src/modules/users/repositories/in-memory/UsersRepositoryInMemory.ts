import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create({
    name,
    email,
    age,
    phone,
    weight,
    gender,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      age,
      phone,
      weight,
      gender,
      password,
    });

    this.users.push(user);

    return user;
  }
  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }
  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === id);
    this.users.splice(userIndex, 1);
  }
  async list(): Promise<User[]> {
    return this.users;
  }
}

export default UsersRepositoryInMemory;
