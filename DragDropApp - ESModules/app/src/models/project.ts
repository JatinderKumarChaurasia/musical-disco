/**
 * 
 * @author Jatinder Kumar Chaurasia
 * @file project.ts
 * @description Drag and Drop
 * @license none
 * 
 */

// -------------------------- Enum-ProjectStatus --------------------------------------------------

export enum ProjectStatus { ACTIVE = 'active', COMPLETED = 'completed' };

// ---------------------------- Project -----------------------------------------------------------

export class Project {

    // Automatically initialized
    constructor(public id: string, public title: string, public description: string, public people: number, public projectStatus: ProjectStatus) { }
}

