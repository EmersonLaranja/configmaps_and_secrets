import { Validation } from "../../interfaces/validation";
import { NumberValidation } from "../../validations/number-validation";
import { RequiredFieldValidation } from "../../validations/required-fields";
import { ValidationComposite } from "../../validations/validation-composite";


export const makeAccountTransferValidationFactory = (): ValidationComposite => {
    const validations: Validation[] = [];


    for (const field of ["amount", "from", "to"]) {
        validations.push(new RequiredFieldValidation(field));
        validations.push(new NumberValidation(field));
    }

    return new ValidationComposite(validations);
};

