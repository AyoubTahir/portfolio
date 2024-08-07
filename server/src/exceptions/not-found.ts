import { HttpException } from ".";

export class NotFoundException extends HttpException {
    constructor(message: string) {
      super(message, 404);
      this.name = 'NotFoundException';
    }
}