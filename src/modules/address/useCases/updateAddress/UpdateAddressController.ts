import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateAddressUseCase from './UpdateAddressUseCase';

class UpdateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { address, number, complement, zipCode, city, state } = request.body;
    const user_id = request.user.id;

    const updateAddressUseCase = container.resolve(UpdateAddressUseCase);

    const updateAddress = await updateAddressUseCase.execute({
      id,
      address,
      number,
      complement,
      zipCode,
      city,
      state,
      user_id,
    });
    return response.json(updateAddress);
  }
}

export default UpdateAddressController;
