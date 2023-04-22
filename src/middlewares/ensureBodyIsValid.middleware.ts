import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

const ensureBodyIsValidMiddleware =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validatedBody = schema.parse(req.body);

    req.body = validatedBody;

    return next();
  };

export default ensureBodyIsValidMiddleware;
