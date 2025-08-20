var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from './base-component.js';
import { autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';
import { validate } from '../validation/input-validation.js';
export class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
    gatherUserInput() {
        const title = this.titleInputElement.value;
        const description = this.descriptionInputElement.value;
        const people = this.peopleInputElement.value;
        const numPeople = +people;
        return [title, description, numPeople];
    }
    validateUserInput(title, description, numPeople) {
        const validtionStrings = [];
        let ret = true;
        const titleValidatable = {
            value: title,
            required: true
        };
        const descriptionValidatable = {
            value: description,
            required: true,
            minLength: 5
        };
        const peopleValidatable = {
            value: numPeople,
            required: true,
            min: 1,
            max: 5
        };
        const titleValidationStatus = validate(titleValidatable);
        const descriptionValidationStatus = validate(descriptionValidatable);
        const peopleValidationStatus = validate(peopleValidatable);
        if (!titleValidationStatus.isValidInput()) {
            validtionStrings.push(`Title is invalid: ${titleValidationStatus.getMessages().join(', ')}`);
        }
        if (!descriptionValidationStatus.isValidInput()) {
            validtionStrings.push(`Description is invalid: ${descriptionValidationStatus.getMessages().join(', ')}`);
        }
        if (!peopleValidationStatus.isValidInput()) {
            validtionStrings.push(`Number of people is invalid: ${peopleValidationStatus.getMessages().join(', ')}`);
        }
        if (validtionStrings.length > 0) {
            alert(`Invalid input, please try again!\n` + validtionStrings.join('\n'));
            ret = false;
        }
        return ret;
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        const isValid = this.validateUserInput(...userInput);
        if (isValid) {
            console.log(userInput);
        }
        const [title, description, numPeople] = userInput;
        projectState.addProject(title, description, numPeople);
        this.clearInputs();
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
//# sourceMappingURL=project-input.js.map