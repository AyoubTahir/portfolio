import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpException } from '../exceptions';

export interface IerrorMiddleware {
  
}

const errorMiddleware = (error: HttpException , req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors
  })

  next();
};

export default errorMiddleware;
