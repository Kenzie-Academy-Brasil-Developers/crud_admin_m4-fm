import { QueryConfig, QueryResult } from "pg";
import { TUser, TUserResponse } from "../../interfaces/users.interface";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schema";
import { AppError } from "../../error";

const recoverUserService = async (userId: number): Promise<TUserResponse> => {
  const id: number = userId;

  // const queryStringTemplate: string = `
  //       SELECT
  //           *
  //       FROM
  //           users
  //       WHERE
  //           id = $1;
  //  `;
  // const queryConfigTemplate: QueryConfig = {
  //   text: queryStringTemplate,
  //   values: [userId],
  // };
  // const queryResultTemplate: QueryResult<TUserResponse> = await client.query(
  //   queryConfigTemplate
  // );

  // const userTemplate = queryResultTemplate.rows[0];

  // if (userTemplate.active === true) {
  //   throw new AppError("User already active", 400);
  // }

  const queryString: string = `
    UPDATE
        users
    SET
        active=true
    WHERE   
        id=$1
    AND 
        active = false
    RETURNING *;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult: QueryResult<TUser> = await client.query(queryConfig);

  const user = queryResult.rows[0];

  return responseUserSchema.parse(user);
};

export default recoverUserService;
