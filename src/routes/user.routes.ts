import { Router } from "express";
import {
  createUsersController,
  listUsersController,
  retrieveUsersController,
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
  ensureAdminExistsMiddleware,
  ensureUserExistsMiddleware,
  retrieveUsersController
);

userRoutes.patch(
  "/:id",
  ensureBodyIsValidMiddleware(updateUserSchema),
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  updateUsersController
);

userRoutes.put(
  "/:id/recover",
  ensureTokenIsValidMiddleware,
  ensureAdminExistsMiddleware
);

userRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureAdminExistsMiddleware,
  ensureUserExistsMiddleware,
  deleteUsersService
);

export default userRoutes;
