import { Router } from 'express';

import addressRoutes from './address.routes';
import authenticateRoutes from './authenticate.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/', authenticateRoutes);
routes.use('/address', addressRoutes);

export default routes;
