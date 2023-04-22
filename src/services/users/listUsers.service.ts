import { QueryResult } from "pg";
import { requestAllUserSchema } from "../../schemas/users.schema";
import { TUserResponse } from "../../interfaces/users.interface";
import { client } from "../../database";
import "dotenv/config";

const listUsersService = async (): Promise<Array<TUserResponse>> => {
  const queryString: string = `
    SELECT
      *
    FROM
      users
  `;

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryString
  );

  const users = queryResult.rows;

  return requestAllUserSchema.parse(users);
  // const users: TUserResponse[] = requestAllUserSchema.parse(queryResult.rows);

  return users;
};

export default listUsersService;
