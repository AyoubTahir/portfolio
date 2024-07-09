import { RequestHandler, Request, Response, NextFunction } from 'express';

type IHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const tryCatchHandler = (handler: IHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default tryCatchHandler;
