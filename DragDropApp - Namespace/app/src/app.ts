/**
 * 
 * @author Jatinder Kumar Chaurasia
 * @file app.ts
 * @description Drag and Drop
 * @license none
 * 
 */

// -------------------------- Enum-ProjectStatus --------------------------------------------------

enum ProjectStatus { ACTIVE = 'active', COMPLETED = 'completed' };

// -------------------------- Type-Listener -------------------------------------------------------

type Listener<T> = (projects: T[]) => void;

// ---------------------------- Project -----------------------------------------------------------

class Project {

    // Automatically initialized
    constructor(public id: string, public title: string, public description: string, public people: number, public projectStatus: ProjectStatus) { }
}
// ----------------------- Project State Management -----------------------------------------------

class State<T> {
    protected listeners: Listener<T>[] = [];
    addListener(listener: Listener<T>) {
        this.listeners.push(listener);
    }
}

class ProjectState extends State<Project>{

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

// --------------------------------- DragDrop -----------------------------------------------------

// interfaces

interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

// -------------------- Component Base Class ------------------------------------------------------

// abstract : Could not instantiate it
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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

// ---------------------------------- Main --------------------------------------------------------

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{

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

//------------------------------ ProjectItem ------------------------------------------------------

// Responsible for rendering single project item
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {

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

// ----------------------------- ProjectList ------------------------------------------------------

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {


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

// ------------------------ Object Execution ------------------------------------------------------

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const completedProjectList = new ProjectList('completed');