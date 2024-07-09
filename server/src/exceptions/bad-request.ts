import { HttpException } from ".";

export class BadRequestException extends HttpException {
    constructor(message: string) {
      super(message, 400);
      this.name = 'BadRequestException';
    }
}