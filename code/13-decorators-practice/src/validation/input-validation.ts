namespace App {

    // Validation
    // The Validatable interface defines the structure for input validation.
    // It includes properties for value, required status, minimum and maximum lengths, and minimum and maximum values.
    // This interface is used to ensure that inputs meet specific criteria before being processed.
    export interface Validatable {
        value: string | number;
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }

    // The ValidationStatus class is used to encapsulate the result of validation checks.
    // It contains a boolean indicating if the input is valid and an array of messages detailing any validation errors.
    // This class provides methods to add messages, retrieve messages, check if the input is valid,
    // and set the validity status. It is used to provide feedback on user inputs in forms.
    class ValidationStatus {
        private isValid: boolean;
        private messages: string[];

        constructor() {
            this.isValid = true;
            this.messages = [];
        }

        addMessage(message: string) {
            this.messages.push(message);
        }
        getMessages() {
            return this.messages;
        }
        isValidInput() {
            return this.isValid;
        }
        setValid(valid: boolean): boolean {
            this.isValid = this.isValid && valid;
            return valid;
        }
    }

    // The validate function checks if the provided input meets the criteria defined in the Validatable interface.
    // It returns true if the input is valid according to the specified rules, such as being required,
    // having a minimum or maximum length, or being within a specified range for numbers.
    // This function is used to validate user inputs in forms, ensuring that only valid data is processed
    export function validate(validatableInput: Validatable): ValidationStatus {

        const status = new ValidationStatus();

        if (validatableInput.required) {
            if (!status.setValid(validatableInput.value.toString().trim().length !== 0))
                status.addMessage('value is required');
        }
        if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
            if (!status.setValid(validatableInput.value.length >= validatableInput.minLength)) {
                status.addMessage(`value must be at least ${validatableInput.minLength} characters long`);
            }
        }
        if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
            if (!status.setValid(validatableInput.value.length <= validatableInput.maxLength)) {
                status.addMessage(`value must be at most ${validatableInput.maxLength} characters long`);
            }
        }
        if (validatableInput.min != null && typeof validatableInput.value === 'number') {
            if (!status.setValid(validatableInput.value >= validatableInput.min)) {
                status.addMessage(`value must be at least ${validatableInput.min}`);
            }
        }
        if (validatableInput.max != null && typeof validatableInput.value === 'number') {
            if (!status.setValid(validatableInput.value <= validatableInput.max)) {
                status.addMessage(`value must be at most ${validatableInput.max}`);
            }
        }
        return status;
    }

}