/**
 * 
 * @author Jatinder Kumar Chaurasia
 * @file base-component.ts
 * @description Drag and Drop
 * @license none
 * 
 */

namespace App {
    // -------------------- Component Base Class ------------------------------------------------------

    // abstract : Could not instantiate it
    export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
        templateElement: HTMLTemplateElement;
        hostElement: T;
        htmlElement: U;

        constructor(templateElementId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {

            this.templateElement = document.getElementById(templateElementId)! as HTMLTemplateElement;
            this.hostElement = document.getElementById(hostElementId)! as T;
            // Getting the content of template 
            const importedNode = document.importNode(this.templateElement.content, true);
            // first child is form
            this.htmlElement = importedNode.firstElementChild as U;
            if (newElementId) {
                this.htmlElement.id = newElementId;
            }
            // attaching templateElement to hostElement
            this.attach(insertAtStart);
        }

        // templateElement => hostElement
        private attach(insertAtStart: boolean) {
            this.hostElement.insertAdjacentElement(insertAtStart == true ? 'afterbegin' : 'beforeend', this.htmlElement);
        }

        abstract configure(): void;
        abstract renderContent(): void;
    }
}