import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
}

const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.success = (message?: string, data?: any ) => {
    const response: ApiResponse = {
      success: true,
      message,
      data
    };
    return res.status(StatusCodes.OK).json(response);
  };

  next();
};

export default responseMiddleware;
