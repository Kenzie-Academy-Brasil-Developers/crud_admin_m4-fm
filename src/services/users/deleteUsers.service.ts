import { Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../../database";

const deleteUsersService = async (userId: number): Promise<void> => {
  const id = userId;
  const queryString: string = `
      UPDATE
          users
      SET
          active = false
      WHERE
          id = $1
      RETURNING *;
      `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  await client.query(queryConfig);

  return;
};

export default deleteUsersService;
