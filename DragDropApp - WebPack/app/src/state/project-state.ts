/**
 * 
 * @author Jatinder Kumar Chaurasia
 * @file project-state.ts
 * @description Drag and Drop
 * @license none
 * 
 */

import { Project, ProjectStatus } from '../models/project'

// -------------------------- Type-Listener -------------------------------------------------------

type Listener<T> = (projects: T[]) => void;


// ----------------------- Project State Management -----------------------------------------------

class State<T> {
    protected listeners: Listener<T>[] = [];
    addListener(listener: Listener<T>) {
        this.listeners.push(listener);
    }
}

export class ProjectState extends State<Project>{

    private projects: Project[] = [];
    private static projectStateInstance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.projectStateInstance) {
            return this.projectStateInstance;
        }
        this.projectStateInstance = new ProjectState();
        return this.projectStateInstance;
    }

    addProject(title: string, description: string, noOfPeoples: number) {
        const project = new Project(Math.random().toString(), title, description, noOfPeoples, ProjectStatus.ACTIVE);
        this.projects.push(project);
        this.updateListeners();
    }

    moveProjectOrSwitchProjectStatus(projectId: string, newStatus: ProjectStatus): void {
        const project = this.projects.find((proje) => proje.id === projectId);
        if (project && project.projectStatus !== newStatus) {
            project.projectStatus = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listener of this.listeners) {
            listener(this.projects.slice()); // give copy of projects
        }
    }
}

export const projectState = ProjectState.getInstance();

    // ------------------------------------------------------------------------------------------------
