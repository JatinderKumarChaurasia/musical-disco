/**
 * 
 * @author Jatinder Kumar Chaurasia
 * @file app.ts
 * @description Drag and Drop
 * @license none
 * 
 */

// -------------------------- Enum-ProjectStatus --------------------------------------------------

enum ProjectStatus {ACTIVE='active',COMPLETED='completed'};

// -------------------------- Type-Listener -------------------------------------------------------

type Listener = (projects:Project[])=> void;

// ---------------------------- Project -----------------------------------------------------------

class Project {

    // Automatically instantiated
    constructor(public id:string,public title:string,public description:string,public people:number,public projectStatus:ProjectStatus){}
}
// ----------------------- Project State Management -----------------------------------------------

class ProjectState {

    private listeners: Listener[] = [];
    private projects: Project[] = [];
    private static projectStateInstance: ProjectState;

    private constructor() { }

    static getInstance() {
        if (this.projectStateInstance) {
            return this.projectStateInstance;
        }
        this.projectStateInstance = new ProjectState();
        return this.projectStateInstance;
    }

    addProject(title: string, description: string, noOfPeoples: number) {
        const project = new Project(Math.random().toString(),title,description, noOfPeoples,ProjectStatus.ACTIVE);
        this.projects.push(project);
        for(const listener of this.listeners){
            listener(this.projects.slice()); // give copy of projects
        }
    }

    addListener(listener: Listener) {
        this.listeners.push(listener);
    }

}

const projectState = ProjectState.getInstance();

// ------------------------------------------------------------------------------------------------

// --------------------------------- Validations Start --------------------------------------------

interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
}

function validate(validatableInput: Validatable) {
    let isValid = true;

    // Required
    if (validatableInput.required) {
        if (typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.trim().length !== 0;
        }
    }

    // MinLength
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.trim().length > validatableInput.minLength;
    }

    // MaxLength
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.trim().length < validatableInput.maxLength;
    }

    //MinValue
    if (validatableInput.minValue != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value > validatableInput.minValue;
    }

    //MaxValue
    if (validatableInput.maxValue != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value < validatableInput.maxValue;
    }

    return isValid;
}
// --------------------------------- Validations End ----------------------------------------------

// ------------------------------- Decorators Start -----------------------------------------------
// AutoBind Decorator
function AutoBind(_target: any, _methodName: string | Symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjacentDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    };
    return adjacentDescriptor;
}

// --------------------------------- Decorators End -----------------------------------------------

// ---------------------------------- Main --------------------------------------------------------

class ProjectInput {

    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    htmlFormElement: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionTextArea: HTMLTextAreaElement;
    peopleInputElement: HTMLInputElement;

    constructor() {

        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        // Getting the content of template 
        const importedNode = document.importNode(this.templateElement.content, true);
        // first child is form
        this.htmlFormElement = importedNode.firstElementChild as HTMLFormElement;
        this.htmlFormElement.id = 'user-form-input';
        this.titleInputElement = this.htmlFormElement.querySelector('#title')! as HTMLInputElement;
        this.descriptionTextArea = this.htmlFormElement.querySelector('#description')! as HTMLTextAreaElement;
        this.peopleInputElement = this.htmlFormElement.querySelector('#people')! as HTMLInputElement;

        // Adding eventListener
        this.configure();
        // attaching templateElement to hostElement
        this.attach();
    }
    // templateElement => hostElement
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.htmlFormElement);
    }

    @AutoBind
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

    private configure() {
        // this.htmlFormElement.addEventListener('submit', this.submitHandler.bind(this));
        this.htmlFormElement.addEventListener('submit', this.submitHandler);
    }

    private gatherUserInputs(): [string, string, number] | void {

        const title = this.titleInputElement.value;
        const description = this.descriptionTextArea.value;
        const peoples = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: title,
            required: true
        }
        const descriptionValidatable: Validatable = {
            value: description,
            required: true,
            minLength: 5
        }
        const peoplesValidatable: Validatable = {
            value: +peoples,
            required: true,
            minValue: 1,
            maxValue: 6
        }
        // if (validate({ value: title, required: true, minLength: 10, maxLength: 30 })
        //     && validate({ value: description, required: true, minLength: 1, maxLength: 200 })
        //     && validate({ value: peoples, required: true, minValue: 2, maxValue: 10 })) {
        if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peoplesValidatable)) {
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
// --------- ProjectList ------------------

class ProjectList {

    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    sectionElement: HTMLElement;

    assignedProjects:Project[];

    constructor(private type: 'active' | 'completed') {

        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.sectionElement = importedNode.firstElementChild as HTMLElement;
        this.sectionElement.id = `${this.type}-projects`;
        this.assignedProjects = [];
        // ProjectState Listener
        projectState.addListener((projects:Project[])=>{
            const relProjects = projects.filter((project)=>{
                if(this.type === 'active'){
                    return project.projectStatus === ProjectStatus.ACTIVE;
                }
                return project.projectStatus === ProjectStatus.COMPLETED;
            });
            this.assignedProjects = relProjects;
            this.renderProject();
        });
        this.renderContent();
        this.attach();
    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.sectionElement);
    }

    private renderContent() {
        const project_list_id = `${this.type}-project-list`;
        this.sectionElement.querySelector('ul')!.id = project_list_id;
        this.sectionElement.querySelector('h2')!.textContent = this.type.toUpperCase() + ' Projects';
    }

    private renderProject(){
        const listElement = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
        listElement.innerHTML = '';
        for(const projectItem of this.assignedProjects){
            const listItem = document.createElement('li');
            listItem.textContent = projectItem.title;
            listElement.appendChild(listItem);
        }
    }
}



// ------------------------ Object Execution ------------------------------------------------------

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const completedProjectList = new ProjectList('completed');