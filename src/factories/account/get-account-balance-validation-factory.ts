import { Validation } from "../../interfaces/validation";
import { NumberValidation } from "../../validations/number-validation";
import { RequiredFieldValidation } from "../../validations/required-fields";
import { ValidationComposite } from "../../validations/validation-composite";


export const getAccountBalanceValidationFactory = (): ValidationComposite => {
    const validations: Validation[] = [];


    validations.push(new RequiredFieldValidation("accountNumber"));
    validations.push(new NumberValidation("accountNumber"));

    return new ValidationComposite(validations);
};

