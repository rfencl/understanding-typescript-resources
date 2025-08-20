/// <reference path="./base-component.ts" />
/// <reference path="../components/project-item.ts" />
/// <reference path="../model/project.ts" />
/// <reference path="../interfaces/drag-drop.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />

namespace App {

    //Project List
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
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
                const listEl = this.element.querySelector('ul')!;
                listEl.classList.add('droppable');
            }
        }

        @autobind
        dropHandler(event: DragEvent): void {
            const projectId = event.dataTransfer!.getData('text/plain');
            projectState.moveProject(projectId,
                this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);

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

}