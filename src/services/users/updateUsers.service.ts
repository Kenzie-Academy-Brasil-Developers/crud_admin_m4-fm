import format from "pg-format";
import { TUserRequest, TUserResponse } from "../../interfaces/users.interface";
import { responseUserSchema } from "../../schemas/users.schema";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";

const updateUsersService = async (
  userId: number,
  userData: Partial<TUserRequest>
): Promise<TUserResponse> => {
  const queryString: string = format(
    `
      UPDATE users
        SET(%I) = ROW(%L)
      WHERE
        id = $1
      RETURNING
        *
    `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryConfig
  );
  const users: TUserResponse = responseUserSchema.parse(queryResult.rows[0]);

  return users;
};

export default updateUsersService;
