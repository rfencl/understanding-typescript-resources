class ValidationStatus {
    constructor() {
        this.isValid = true;
        this.messages = [];
    }
    addMessage(message) {
        this.messages.push(message);
    }
    getMessages() {
        return this.messages;
    }
    isValidInput() {
        return this.isValid;
    }
    setValid(valid) {
        this.isValid = this.isValid && valid;
        return valid;
    }
}
export function validate(validatableInput) {
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
//# sourceMappingURL=input-validation.js.map