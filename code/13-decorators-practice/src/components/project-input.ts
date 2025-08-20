namespace App {
    // Project Input
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;

        constructor() {
            super('project-input', 'app', true, 'user-input');
            this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;
            this.configure();
        }

        configure() {
            this.element.addEventListener('submit', this.submitHandler);
        }


        renderContent() { }

        private gatherUserInput(): [string, string, number] | void {
            const title = this.titleInputElement.value;
            const description = this.descriptionInputElement.value;
            const people = this.peopleInputElement.value;
            const numPeople = +people;
            return [title, description, numPeople];
        }

        private validateUserInput(title: string, description: string, numPeople: number): boolean {
            const validtionStrings: string[] = []
            let ret = true;

            const titleValidatable: Validatable = {
                value: title,
                required: true
            };
            const descriptionValidatable: Validatable = {
                value: description,
                required: true,
                minLength: 5
            };
            const peopleValidatable: Validatable = {
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

        private clearInputs() {
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = '';
        }


        @autobind
        private submitHandler(event: Event) {
            event.preventDefault();
            const userInput = this.gatherUserInput()!;
            const isValid = this.validateUserInput(...userInput);
            if (isValid) {
                console.log(userInput);
            }
            const [title, description, numPeople] = userInput;
            projectState.addProject(title, description, numPeople);
            this.clearInputs();
        }

    }
}