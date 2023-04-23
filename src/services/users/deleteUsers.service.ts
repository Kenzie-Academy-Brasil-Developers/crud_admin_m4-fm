import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { TUser } from "../../interfaces/users.interface";
import { AppError } from "../../error";

const deleteUsersService = async (userId: number): Promise<void> => {
  const id = userId;
  const queryString: string = `
      UPDATE
          users
      SET
          active = false
      WHERE
          id = $1
      AND
          active = true
      RETURNING *;
      `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryREsult: QueryResult<TUser> = await client.query(queryConfig);

  const user = queryREsult.rows[0];

  return;
};

export default deleteUsersService;
