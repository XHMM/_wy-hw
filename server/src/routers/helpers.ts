import { Request, Response, NextFunction } from 'express';

export function asyncWrapper(fn) {
  return async function(req: Request, res: Response, next: NextFunction) {
    try {
      await fn(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}