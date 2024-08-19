import { Validation } from "../../interfaces/validation";
import { Account } from "../../models/account";
import { NumberValidation } from "../../validations/number-validation";
import { RequiredFieldValidation } from "../../validations/required-fields";
import { ValidationComposite } from "../../validations/validation-composite";


export const addAccountValidationFactory = (): ValidationComposite => {
    const validations: Validation[] = [];


    validations.push(new RequiredFieldValidation("account_number"));
    validations.push(new NumberValidation("account_number"));

    return new ValidationComposite(validations);
};

