import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserUseCase from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, phone, email, age, weight, gender, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      phone,
      email,
      age,
      weight,
      gender,
      password,
    });
    return response.status(201).json(classToClass(user));
  }
}

export default CreateUserController;
