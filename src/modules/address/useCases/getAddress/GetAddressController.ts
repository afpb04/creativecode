import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetAddressUseCase from './GetAddressUseCase';

class GetAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getAddressUseCase = container.resolve(GetAddressUseCase);

    const address = await getAddressUseCase.execute(id);

    return response.json(address);
  }
}
export default GetAddressController;
