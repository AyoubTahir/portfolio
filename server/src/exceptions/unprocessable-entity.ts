import { HttpException } from ".";
import { formatZodError } from "../utils/helpers";

export class UnprocessableEntity extends HttpException {
    constructor(message: string, errors: any) {
      super(message, 422, formatZodError(errors));
      this.name = 'UnprocessableEntity';
    }
}