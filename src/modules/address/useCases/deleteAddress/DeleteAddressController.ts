import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteAddressUseCase from './DeleteAddressUseCase';

class DeleteAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const deleteAddressUseCase = container.resolve(DeleteAddressUseCase);

    await deleteAddressUseCase.execute({ id, user_id });

    return response.status(204).send();
  }
}

export default DeleteAddressController;
