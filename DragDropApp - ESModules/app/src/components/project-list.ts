/**
 * 
 * @author Jatinder Kumar Chaurasia
 * @file project-list.ts
 * @description Drag and Drop
 * @license none
 * 
 */

/// <reference path='base-component.ts' />
/// <reference path='../decorators/autobind.ts' />
/// <reference path='../models/drag-drop.ts' />
/// <reference path='../models/project.ts' />
/// <reference path='../state/project-state.ts' />

namespace App {
    // ----------------------------- ProjectList ------------------------------------------------------

    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {


        assignedProjects: Project[];

        constructor(private type: 'active' | 'completed') {
            super('project-list', 'app', false, `${type}-projects`);
            this.assignedProjects = [];

            this.configure();
            this.renderContent();
        }

        configure(): void {
            // ProjectState Listener
            // Adding Drag and Drop Listeners
            this.htmlElement.addEventListener('dragover', this.dragOverHandler);
            this.htmlElement.addEventListener('dragleave', this.dragLeaveHandler);
            this.htmlElement.addEventListener('drop', this.dropHandler);

            projectState.addListener((projects: Project[]) => {
                const relProjects = projects.filter((projec) => {
                    if (this.type === 'active') {
                        return projec.projectStatus === ProjectStatus.ACTIVE;
                    }
                    return projec.projectStatus === ProjectStatus.COMPLETED;
                });
                this.assignedProjects = relProjects;
                this.renderProject();
            });
        }

        renderContent() {
            const project_list_id = `${this.type}-project-list`;
            this.htmlElement.querySelector('ul')!.id = project_list_id;
            this.htmlElement.querySelector('h2')!.textContent = this.type.toUpperCase() + ' Projects';
        }

        private renderProject() {
            const listElement = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
            listElement.innerHTML = '';
            // this.htmlElement.innerHTML = '';
            for (const projectIte of this.assignedProjects) {
                // const listItem = document.createElement('li');
                // listItem.textContent = projectItem.title;
                // listElement.appendChild(listItem);
                new ProjectItem(this.htmlElement.querySelector('ul')!.id, projectIte);
            }
        }

        // Interface Methods for DragTarget 

        @AutoBind
        dragOverHandler(event: DragEvent): void {
            if (event.dataTransfer && event.dataTransfer!.types[0] === 'text/plain') {
                event.preventDefault();
                const listElement = this.htmlElement.querySelector('ul')!;
                listElement.classList.add('droppable');
            }
            console.log('Drag Over ')
        }

        @AutoBind
        dropHandler(event: DragEvent): void {
            const project_id = event.dataTransfer!.getData('text/plain');
            projectState.moveProjectOrSwitchProjectStatus(project_id, this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.COMPLETED);
            console.log('Drop ')
        }

        @AutoBind
        dragLeaveHandler(_event: DragEvent): void {
            const listElement = this.htmlElement.querySelector('ul')!;
            listElement.classList.remove('droppable');
            console.log('Drag Leave ')
        }

    }

}