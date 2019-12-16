/**
 * 
 * @author Jatinder Kumar Chaurasia
 * @file project-items.ts
 * @description Drag and Drop
 * @license none
 * 
 */

/// <reference path='base-component.ts' />
/// <reference path='../decorators/autobind.ts' />
/// <reference path='../models/project.ts' />
/// <reference path='../models/drag-drop.ts' />

namespace App {
    //------------------------------ ProjectItem ------------------------------------------------------

    // Responsible for rendering single project item
    export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {

        private project: Project;

        get persons() {
            if (this.project.people === 1) {
                return 'Assigned To : 1 Person';
            }
            return `Assigned To : ${this.project.people} Person\'s`;
        }

        constructor(hostElementId: string, project: Project) {
            super('single-project', hostElementId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        configure(): void {
            this.htmlElement.addEventListener('dragstart', this.dragStartHandler);
            this.htmlElement.addEventListener('dragend', this.dragEndHandler);
        }
        renderContent(): void {
            this.htmlElement.querySelector('h2')!.textContent = 'Project Title : ' + this.project.title;
            this.htmlElement.querySelector('h3')!.textContent = this.persons;
            this.htmlElement.querySelector('p')!.textContent = 'Description : ' + this.project.description;
        }

        // Interface Methods for Draggable

        @AutoBind
        dragStartHandler(event: DragEvent): void {
            console.log(event);
            event.dataTransfer!.setData('text/plain', this.project.id);
            event.dataTransfer!.effectAllowed = 'move';
            console.log('Drag Started !! ');
        }

        dragEndHandler(_: DragEvent): void {
            console.log('Drag End !! ');
        }

    }

}