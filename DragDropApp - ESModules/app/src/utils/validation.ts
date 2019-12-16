/**
 * 
 * @author Jatinder Kumar Chaurasia
 * @file validation.ts
 * @description Drag and Drop
 * @license none
 * 
 */

namespace App {

    // --------------------------------- Validations Start --------------------------------------------

    export interface Validatable {
        value: string | number;
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        minValue?: number;
        maxValue?: number;
    }

    export function validate(validatableInput: Validatable) {
        let isValid = true;

        // Required
        if (validatableInput.required) {
            if (typeof validatableInput.value === 'string') {
                isValid = isValid && validatableInput.value.trim().length !== 0;
            }
        }

        // MinLength
        if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.trim().length > validatableInput.minLength;
        }

        // MaxLength
        if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.trim().length < validatableInput.maxLength;
        }

        //MinValue
        if (validatableInput.minValue != null && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value > validatableInput.minValue;
        }

        //MaxValue
        if (validatableInput.maxValue != null && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value < validatableInput.maxValue;
        }

        return isValid;
    }
    // --------------------------------- Validations End ----------------------------------------------

}