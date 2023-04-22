import { Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../../database";

const deleteUsersService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);
  const queryString: string = `
    DELETE FROM
        users
    WHERE
        id = $1;
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  await client.query(queryConfig);

  return res.status(204).send();
};

export default deleteUsersService;
