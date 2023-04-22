import format from "pg-format";
import { TUserResponse, TUserUpdated } from "../../interfaces/users.interface";
import { responseUserSchema } from "../../schemas/users.schema";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";

const updateUsersService = async (
  userData: TUserUpdated,
  id: number
): Promise<TUserResponse> => {
  const validateBody = userData;

  const queryString: string = format(
    `
      UPDATE 
          users
        SET(%I) = ROW(%L)
      WHERE
          id = $1
      RETURNING *
    `,
    Object.keys(validateBody),
    Object.values(validateBody)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryConfig
  );
  const users: TUserResponse = responseUserSchema.parse(queryResult.rows[0]);

  return users;
};

export default updateUsersService;
