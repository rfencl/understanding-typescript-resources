var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '../components/base-component.js';
import { autobind } from '../decorators/autobind.js';
import { ProjectStatus } from '../model/project.js';
import { projectState } from '../state/project-state.js';
export class ProjectItem extends Component {
    get persons() {
        const numPeople = this.project.people;
        return numPeople + ' person' + (numPeople > 1 ? 's' : '');
    }
    constructor(hostId, project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(_) {
        console.log('Drag End');
    }
    doubleClickHandler(_) {
        const newStatus = this.project.status === ProjectStatus.Active
            ? ProjectStatus.Finished
            : ProjectStatus.Active;
        projectState.moveProject(this.project.id, newStatus);
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
        this.element.setAttribute('draggable', 'true');
        this.element.classList.add('draggable');
        this.element.addEventListener('dblclick', this.doubleClickHandler);
    }
    renderContent() {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = `${this.persons} assigned`;
        this.element.querySelector('p').textContent = this.project.description;
    }
}
__decorate([
    autobind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    autobind
], ProjectItem.prototype, "dragEndHandler", null);
__decorate([
    autobind
], ProjectItem.prototype, "doubleClickHandler", null);
//# sourceMappingURL=project-item.js.map