import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import CreateUserController from '../../../../modules/users/useCases/createUser/CreateUserController';
import DeleteUserController from '../../../../modules/users/useCases/deleteUser/DeleteUserController';
import DetailUserController from '../../../../modules/users/useCases/DetailUser/DetailUserController';
import ListUsersController from '../../../../modules/users/useCases/listUsers/ListUsersController';
import ProfileUserController from '../../../../modules/users/useCases/profileUser/ProfileUserController';
import UpdateUserController from '../../../../modules/users/useCases/updateUser/UpdateUserController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const detailUserController = new DetailUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();
const profileUserController = new ProfileUserController();
const deleteUserController = new DeleteUserController();

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      age: Joi.string().required(),
      weight: Joi.number().required(),
      gender: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  createUserController.handle,
);
usersRoutes.get('/', ensureAuthenticated, listUsersController.handle);
usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle);

usersRoutes.get(
  '/detail/:id',
  ensureAuthenticated,
  ensureAdmin,
  detailUserController.handle,
);
usersRoutes.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      age: Joi.string().required(),
      weight: Joi.number().required(),
      gender: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  ensureAdmin,
  updateUserController.handle,
);
usersRoutes.delete(
  '/delete/:id',
  ensureAuthenticated,
  ensureAdmin,
  deleteUserController.handle,
);

export default usersRoutes;
