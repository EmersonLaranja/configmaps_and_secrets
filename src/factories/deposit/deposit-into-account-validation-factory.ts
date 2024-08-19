import { Validation } from "../../interfaces/validation";
import { Account } from "../../models/account";
import { NumberValidation } from "../../validations/number-validation";
import { RequiredFieldValidation } from "../../validations/required-fields";
import { ValidationComposite } from "../../validations/validation-composite";


export const depositIntoAccountValidationFactory = (): ValidationComposite => {
    const validations: Validation[] = [];

    for (const field of ["account_number", "amount"]) {
        validations.push(new RequiredFieldValidation(field));
        validations.push(new NumberValidation(field));
    }

    return new ValidationComposite(validations);
};

