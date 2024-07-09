import { HttpException } from ".";

export class UnauthorizedException extends HttpException {
    constructor(message: string) {
      super(message, 401);
      this.name = 'UnauthorizedError';
    }
}