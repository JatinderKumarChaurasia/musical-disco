/**
 * 
 * @author Jatinder Kumar Chaurasia
 * @file project-input.ts
 * @description Drag and Drop
 * @license none
 * 
 */

import Component from './base-component';
import { AutoBind as autobind } from '../decorators/autobind'
import { projectState } from '../state/project-state';
import * as Validations from '../utils/validation';

// ---------------------------------- Main --------------------------------------------------------

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{

    titleInputElement: HTMLInputElement;
    descriptionTextArea: HTMLTextAreaElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-form-input');
        this.titleInputElement = this.htmlElement.querySelector('#title')! as HTMLInputElement;
        this.descriptionTextArea = this.htmlElement.querySelector('#description')! as HTMLTextAreaElement;
        this.peopleInputElement = this.htmlElement.querySelector('#people')! as HTMLInputElement;

        // Adding eventListener
        this.configure();
    }

    configure() {
        // this.htmlFormElement.addEventListener('submit', this.submitHandler.bind(this));
        this.htmlElement.addEventListener('submit', this.submitHandler);
    }

    renderContent() { }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInputs = this.gatherUserInputs();
        if (Array.isArray(userInputs)) {
            const [title, description, peoples] = userInputs
            // console.log('is array !', title, description, peoples);
            projectState.addProject(title, description, peoples);

            this.clearAndResetInputs();
        }
        console.log(userInputs);
    }

    private gatherUserInputs(): [string, string, number] | void {

        const title = this.titleInputElement.value;
        const description = this.descriptionTextArea.value;
        const peoples = this.peopleInputElement.value;

        const titleValidatable: Validations.Validatable = {
            value: title,
            required: true
        }
        const descriptionValidatable: Validations.Validatable = {
            value: description,
            required: true,
            minLength: 5
        }
        const peoplesValidatable: Validations.Validatable = {
            value: +peoples,
            required: true,
            minValue: 1,
            maxValue: 6
        }
        // if (validate({ value: title, required: true, minLength: 10, maxLength: 30 })
        //     && validate({ value: description, required: true, minLength: 1, maxLength: 200 })
        //     && validate({ value: peoples, required: true, minValue: 2, maxValue: 10 })) {
        if (!Validations.validate(titleValidatable) || !Validations.validate(descriptionValidatable) || !Validations.validate(peoplesValidatable)) {
            alert('Invalid Input! Please try again and input valid value');
            return;
        } else {
            return [title, description, +peoples];
        }
        // if (title.trim().length === 0 || description.trim().length === 0 || peoples.trim().length === 0) {
        //     alert('Invalid Input! Please try again and input valid value');
        //     return;
        // }
    }

    private clearAndResetInputs() {

        this.titleInputElement.value = '';
        this.descriptionTextArea.value = '';
        this.peopleInputElement.value = '';
    }
}
