import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import IUsersRepository from '../../../repositories/IUsersRepository';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }
  async create({
    id,
    name,
    email,
    age,
    phone,
    weight,
    gender,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      id,
      name,
      phone,
      email,
      password,
      age,
      weight,
      gender,
    });
    await this.repository.save(user);

    return user;
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { id },
      relations: ['address'],
    });
    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async list(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }
}

export default UsersRepository;
