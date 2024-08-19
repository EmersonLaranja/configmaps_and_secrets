import { Validation } from "../interfaces/validation";
import { InvalidParamError } from "../utils/errors/invalid-param-error";

export class NumberValidation implements Validation {
    constructor(
        private readonly fieldName: string,
    ) { }

    validate(input: any): Error | void {

        const value = input[this.fieldName];
        const isNumberRegex = /^\d+([.,]\d+)?$/;
        if (!isNumberRegex.test(value)) {
            return new InvalidParamError(this.fieldName);
        }
    }
}
