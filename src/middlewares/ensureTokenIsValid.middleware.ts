import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import jwt from "jsonwebtoken";

const ensureTokenIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let authorization = req.headers.authorization;

  if (!authorization) {
    throw new AppError("Missing Bearer Token", 401);
  }
  const token = authorization.split(" ")[1];

  jwt.verify(
    token,
    String(process.env.SECRET_KEY),
    (err: any, decoded: any) => {
      if (err) {
        throw new AppError(err.message, 401);
      }
      res.locals.token = {
        id: decoded?.sub,
        admin: decoded.admin,
      };
    }
  );

  return next();
};

export default ensureTokenIsValidMiddleware;
