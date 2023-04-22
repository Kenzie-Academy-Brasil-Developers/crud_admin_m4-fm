import { Request, Response } from "express";
import listUsersService from "../services/users/listUsers.service";
import updateUsersService from "../services/users/updateUsers.service";
import { TUserRequest, TUserResponse } from "../interfaces/users.interface";

import createUsersService from "../services/users/createUsers.service";
import retrieveUsersProfileService from "../services/users/retrieveUsersProfile.servise";
import { number } from "zod";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: TUserRequest = req.body;

  const newUser: TUserResponse = await createUsersService(payload);

  return res.status(201).json(newUser);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: TUserResponse[] = await listUsersService();

  return res.status(200).json(users);
};

const retrieveUsersProfileController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = res.locals.token.id;
  const user: TUserResponse = await retrieveUsersProfileService(userId);

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
  retrieveUsersProfileController,
  updateUsersController,
};
