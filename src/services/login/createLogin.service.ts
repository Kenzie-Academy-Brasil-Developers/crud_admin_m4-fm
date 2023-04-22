import format from "pg-format";
import {
  TLoginRequest,
  TLoginResponse,
} from "../../interfaces/login.interfaces";
import { QueryResult } from "pg";
import { TUser } from "../../interfaces/users.interface";
import { client } from "../../database";
import { AppError } from "../../error";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createLoginService = async (
  payload: TLoginRequest
): Promise<TLoginResponse> => {
  const queryString: string = `
        SELECT
            * 
        FROM 
            users 
        WHERE 
            email = %L;
    `;
  const queryFormat: string = format(queryString, payload.email);
  const queryResult: QueryResult<TUser> = await client.query(queryFormat);
  const user = queryResult.rows[0];

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const comparePassword: boolean = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!comparePassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    {
      email: user.email,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: user.id.toString(),
    }
  );

  return { token };
};

export default createLoginService;
