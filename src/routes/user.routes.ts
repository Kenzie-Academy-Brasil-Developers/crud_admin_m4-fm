import { Router } from "express";
import {
  createUsersController,
  deactivateUserController,
  listUsersController,
  recoverUserController,
  retrieveUsersProfileController,
  updateUsersController,
} from "../controllers/users.controllers";
import ensureEmailNotExistsMiddleware from "../middlewares/ensureEmailNotExists.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import { requestUserSchema, updateUserSchema } from "../schemas/users.schema";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureAdminExistsMiddleware from "../middlewares/ensureAdminExists.middleware";
import deleteUsersService from "../services/users/deleteUsers.service";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureBodyIsValidMiddleware(requestUserSchema),
  ensureEmailNotExistsMiddleware,
  createUsersController
);

userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureAdminExistsMiddleware,
  listUsersController
);

userRoutes.get(
  "/:profile",
  ensureTokenIsValidMiddleware,
  retrieveUsersProfileController
);

userRoutes.patch(
  "/:id",
  ensureBodyIsValidMiddleware(updateUserSchema),
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  ensureEmailNotExistsMiddleware,
  updateUsersController
);

userRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  deactivateUserController
);

userRoutes.put(
  "/:id/recover",
  ensureTokenIsValidMiddleware,
  ensureAdminExistsMiddleware,
  recoverUserController
);

export default userRoutes;
