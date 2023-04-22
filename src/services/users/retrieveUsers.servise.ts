import { TUser, TUserResponse } from "../../interfaces/users.interface";
import { responseUserSchema } from "../../schemas/users.schema";

const retrieveUsersService = async (user: TUser): Promise<TUserResponse> => {
  const userResponse = responseUserSchema.parse(user);

  return userResponse;
};

export default retrieveUsersService;
