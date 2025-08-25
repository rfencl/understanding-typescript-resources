import { Project } from '../model/project.js';
import { ProjectStatus } from '../model/project.js';

// Listener type definition
// This type defines a listener function that takes an array of items of type T.
// It is used to notify listeners about changes in the state of projects.
type Listener<T> = (items: T[]) => void

// The State class is a generic class that manages listeners for state changes.
// It provides methods to add listeners that will be notified when the state changes.
// This class is used as a base for managing the state of projects in the application.
// It allows for a flexible way to handle different types of state changes by using generics.
// The listeners are functions that take an array of items of type T and perform actions based on
class State<T> {
    protected listeners: Listener<T>[] = []; // Array to hold listener functions        
    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

// The ProjectState class is a singleton that manages the state of projects.
// It allows adding new projects and provides a way to listen for changes in the project list.
export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;  // Singleton instance       

    private constructor() {
        super();
    }

    // getInstance method ensures that only one instance of ProjectState exists.
    // It returns the existing instance if it exists, or creates a new one if it doesn't
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    // addProject method allows adding a new project to the state.
    // It creates a new Project instance and adds it to the projects array.
    // After adding the project, it notifies all listeners about the change.
    // This method is used to manage the project list and ensure that all components are updated when
    // a new project is added.
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

    // moveProject method allows changing the status of a project.
    // It finds the project by its ID and updates its status to either Active or Finished.
    // After updating the project, it notifies all listeners about the change.
    // This method is used to manage the project list and ensure that all components are updated when
    // a project's status changes.
    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.notifyListeners();
        }
    }

    // notifyListeners method iterates over all registered listeners and calls them with a copy of the projects array.
    // This ensures that all components that are listening for changes in the project state are updated with the latest project list.
    // It is called whenever a project is added or its status is changed.
    // This method is crucial for maintaining the reactive nature of the application, allowing components to update
    // automatically when the state changes.
    // It ensures that the UI reflects the current state of the projects.
    // By passing a copy of the projects array, it prevents unintended side effects from modifying the
    // original array while listeners are processing the data.
    private notifyListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice()); // Notify listeners with a copy of the projects array
        }
    }
}

// Create a singleton instance of ProjectState
// This instance is used throughout the application to manage the project state.
// It ensures that there is a single source of truth for the project data,
// allowing different components to access and modify the project list consistently.
// The instance is created using the getInstance method of the ProjectState class,
// which ensures that only one instance exists at any time.
// This pattern is known as the Singleton pattern, which restricts the instantiation of a class
// to a single object. It is useful in scenarios where a single point of control is needed
// for managing shared resources or state, such as the project list in this application.
// This instance can be used to add projects, move projects between active and finished states,
export const projectState = ProjectState.getInstance();

