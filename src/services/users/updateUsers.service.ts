import format from "pg-format";
import { TUserResponse, TUserUpdated } from "../../interfaces/users.interface";
import {
  responseUserSchema,
  updateUserSchema,
} from "../../schemas/users.schema";
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

  let queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResultToUpdate: QueryResult<TUserResponse> = await client.query(
    queryConfig
  );
  updateUserSchema.parse(queryResultToUpdate);

  const queryTemplate: string = `
            SELECT
              *
            FROM
              users
            WHERE
              id = $1
        `;
  queryConfig = {
    text: queryTemplate,
    values: [id],
  };
  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryConfig
  );

  const updateUser: TUserResponse = responseUserSchema.parse(
    queryResult.rows[0]
  );

  return updateUser;
};

export default updateUsersService;
