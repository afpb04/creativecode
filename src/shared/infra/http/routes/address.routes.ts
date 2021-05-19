import { Router } from 'express';

import CreateAddressController from '../../../../modules/address/useCases/createAddress/CreateAddressController';
import DeleteAddressController from '../../../../modules/address/useCases/deleteAddress/DeleteAddressController';
import GetAddressController from '../../../../modules/address/useCases/getAddress/GetAddressController';
import UpdateAddressController from '../../../../modules/address/useCases/updateAddress/UpdateAddressController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const addressRoutes = Router();

const createAddressController = new CreateAddressController();
const getAddressController = new GetAddressController();
const deleteAddressController = new DeleteAddressController();
const updateAddressController = new UpdateAddressController();

addressRoutes.post('/', ensureAuthenticated, createAddressController.handle);
addressRoutes.get('/:id', ensureAuthenticated, getAddressController.handle);
addressRoutes.delete(
  '/delete/:id',
  ensureAuthenticated,
  deleteAddressController.handle,
);
addressRoutes.put(
  '/update/:id',
  ensureAuthenticated,
  updateAddressController.handle,
);

export default addressRoutes;
