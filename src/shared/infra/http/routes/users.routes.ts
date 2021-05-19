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

usersRoutes.post('/', createUserController.handle);
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
