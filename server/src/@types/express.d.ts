import { Response } from 'express';

declare global {
  namespace Express {
    interface Response {
      success: ( message?: string, data?: any) => Response;
    }
  }
}