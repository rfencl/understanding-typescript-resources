"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class ProjectState {
    constructor() {
        this.projects = [];
        this.listeners = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addProject(title, description, people) {
        const newProject = { id: Math.random().toString(), title, description, people, status: ProjectStatus.Active };
        this.projects.push(newProject);
        this.notifyListeners();
    }
    notifyListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
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
function validate(validatableInput) {
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
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateElement = document.getElementById('project-list');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        this.assignedProjects = [];
        projectState.addListener((projects) => {
            const relevantProjects = projects.filter((project) => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.Active;
                }
                return project.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = '';
        for (const projectItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = projectItem.title;
            listEl.appendChild(listItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = `${this.type.toUpperCase()} PROJECTS`;
    }
    attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
        this.attach();
    }
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
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
//# sourceMappingURL=app.js.map