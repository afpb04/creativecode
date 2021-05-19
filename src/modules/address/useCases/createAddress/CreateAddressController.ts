import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAddressUseCase from './CreateAddressUseCase';

class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { address, number, complement, zipCode, city, state } = request.body;
    const { id } = request.user;

    const createAddressUseCase = container.resolve(CreateAddressUseCase);

    const newAddress = await createAddressUseCase.execute({
      address,
      number,
      complement,
      zipCode,
      city,
      state,
      user_id: id,
    });
    return response.status(201).json(newAddress);
  }
}
export default CreateAddressController;
