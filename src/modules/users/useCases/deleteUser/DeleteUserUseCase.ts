import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import IUsersRepository from '../../repositories/IUsersRepository';

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError('User does not exists');
    }
    await this.usersRepository.delete(id);
  }
}

export default DeleteUserUseCase;
