import { Request, Response } from "express";
import listUsersService from "../services/users/listUsers.service";
import retrieveUsersService from "../services/users/retrieveUsers.servise";
import updateUsersService from "../services/users/updateUsers.service";
import { TUserRequest, TUserResponse } from "../interfaces/users.interface";
import { requestUserSchema } from "../schemas/users.schema";
import createUsersService from "../services/users/createUsers.service";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = requestUserSchema.parse(req.body);
  const newUser: TUserResponse = await createUsersService(userData);

  return res.status(201).json(newUser);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listUsersService();

  return res.json(users);
};

const retrieveUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await retrieveUsersService(res.locals.user);

  return res.json(user);
};

const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const userData: Partial<TUserRequest> = req.body;

  const updatedUser = await updateUsersService(userId, userData);

  return res.json(updatedUser);
};

export {
  createUsersController,
  listUsersController,
  retrieveUsersController,
  updateUsersController,
};
