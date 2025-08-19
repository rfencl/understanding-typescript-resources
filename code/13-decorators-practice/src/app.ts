// Drag & Drop Interfaces
interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

// Project State Management
// The ProjectState class is a singleton that manages the state of projects.
// It allows adding new projects and provides a way to listen for changes in the project list.
enum ProjectStatus {
    Active,
    Finished
}

// Project Type
class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) { }
}

type Listener<T> = (items: T[]) => void
class State<T> {
    protected listeners: Listener<T>[] = []; // Array to hold listener functions        
    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;  // Singleton instance       

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, description: string, people: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            people,
            ProjectStatus.Active
        );
        this.projects.push(newProject);
        this.notifyListeners();
    }

    private notifyListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice()); // Notify listeners with a copy of the projects array
        }
    }
}

const projectState = ProjectState.getInstance();

function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

// Validation
// The Validatable interface defines the structure for input validation.
// It includes properties for value, required status, minimum and maximum lengths, and minimum and maximum values.
// This interface is used to ensure that inputs meet specific criteria before being processed.
interface Validatable {
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
function validate(validatableInput: Validatable): ValidationStatus {

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

// Component Base Class
// The Component class serves as a base class for all components in the application.
// It provides a template for creating components with a specific HTML structure.
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;
    constructor(
        templateId: string,
        hostElementId: string,
        insertAtStart: boolean,
        newElementId?: string
    ) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId;
        }

        this.attach(insertAtStart);
    }
    attach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }
    abstract configure(): void;

    abstract renderContent(): void;
}

// Project Item
// The ProjectItem class extends the Component class and represents a single project item in the project list.
// It is responsible for rendering the project details and configuring the item.
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons() {
        const numPeople = this.project.people;
        return numPeople + ' person' + (numPeople > 1 ? 's' : '');
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    @autobind
    dragEndHandler(_: DragEvent): void {
        console.log('Drag End');
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
        this.element.setAttribute('draggable', 'true'); // Make the item draggable
        this.element.classList.add('draggable'); // Add a class for styling
    }
    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = `${this.persons} assigned`;
        this.element.querySelector('p')!.textContent = this.project.description;
    }

}

//Project List
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            this.element.classList.add('droppable'); // Add a class to indicate that the drop target is valid
        }
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.add('droppable');
    }

    @autobind
    dropHandler(event: DragEvent): void {
        const projectId = event.dataTransfer!.getData('text/plain');
        projectState.addListener((projects: Project[]) => {
            const project = projects.find(prj => prj.id === projectId);
            if (project && ((this.type === 'active' && project.status !== ProjectStatus.Active) ||
                (this.type === 'finished' && project.status !== ProjectStatus.Finished))) {
                project.status = this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished;
                projectState['notifyListeners']();
            }
        });
        this.element.classList.remove('droppable');
    }

    @autobind
    dragLeaveHandler(
        _: DragEvent): void {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter((project: Project) => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.Active;
                }
                return project.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
        listEl.innerHTML = ''; // Clear existing list items
        for (const projectItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, projectItem);
        }
    }



}

// Project Input
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');


