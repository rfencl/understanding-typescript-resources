
// Project Model
// This module defines the structure of a project and its status.
// Project State Management
export enum ProjectStatus {
    Active,
    Finished
}

// Project Type
export class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) { }
}

