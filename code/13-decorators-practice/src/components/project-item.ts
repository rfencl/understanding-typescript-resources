import { Draggable } from '../interfaces/drag-drop.js';
import { Component } from '../components/base-component.js';
import { Project } from '../model/project.js';
import { autobind } from '../decorators/autobind.js';
import { ProjectStatus } from '../model/project.js';
import { projectState } from '../state/project-state.js';

// Project Item
// The ProjectItem class extends the Component class and represents a single project item in the project list.
// It is responsible for rendering the project details and configuring the item.
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    // The persons getter returns a formatted string indicating the number of people assigned to the project.
    // It uses the project.people property to determine the number of people and returns a string
    // that includes the correct pluralization based on the number of people.
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

    // The dragStartHandler method is called when the user starts dragging the project item.
    // It sets the data to be transferred during the drag operation, which is the project ID.
    // It also sets the effect allowed for the drag operation to 'move', indicating that the item can be moved.
    // This method is decorated with @autobind to ensure that it retains the correct context (this) when called as an event handler.
    // The method is used to prepare the project item for dragging, allowing it to be moved to a different project list.
    @autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    // The dragEndHandler method is called when the user ends the drag operation.
    // It currently logs a message to the console indicating that the drag operation has ended.
    // This method is also decorated with @autobind to ensure that it retains the correct context (this) when called as an event handler.
    // The method can be extended in the future to perform additional actions when the drag operation ends, such as updating the UI or notifying other components.
    // It is used to handle the end of the drag operation, allowing for cleanup or additional
    @autobind
    dragEndHandler(_: DragEvent): void {
        console.log('Drag End');
    }

    @autobind
    doubleClickHandler(_: MouseEvent): void {
        // Toggle project status
        const newStatus = this.project.status === ProjectStatus.Active
            ? ProjectStatus.Finished
            : ProjectStatus.Active;
        projectState.moveProject(this.project.id, newStatus);
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
        this.element.setAttribute('draggable', 'true'); // Make the item draggable
        this.element.classList.add('draggable'); // Add a class for styling
        this.element.addEventListener('dblclick', this.doubleClickHandler);
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = `${this.persons} assigned`;
        this.element.querySelector('p')!.textContent = this.project.description;
    }

}


