/**
 * 
 * @param constructor 
 * @name decorators training
 * @author Jatinder Kumar Chaurasia
 * @summary decorators executes botton-up
 */




// Factory Decorators

// function Logger(constructor: Function) {
//     console.log('Logging..............');
//     console.log(constructor);
// }

//Property Decorator
function Logger(logString: string) {
    console.log('Rendering with Logger Factory !!.......');
    return function (constructor: Function) {
        console.log('Rendering with Logger !!.......');
        console.log(logString);
        console.log(constructor);
    };
}

// function WithTemplate(template: string, hookId: string) {
//     return function (_: Function) {
//         const element = document.getElementById(hookId);
//         if(element){
//             element.innerHTML = template;
//         }
//     };
// }

// function WithTemplate(template: string, hookId: string) {
//     console.log('Rendering with Template Factory !!.......');
//     return function (originalConstructor: any) {
//         console.log('Rendering with Template !!.......');
//         const element = document.getElementById(hookId);
//         const p = new originalConstructor();
//         if (element) {
//             element.innerHTML = template;
//             element.querySelector('h1')!.textContent = p.name;
//         }
//     };
// }

function WithTemplate(template: string, hookId: string) {
    console.log('Rendering with Template Factory !!.......');
    return function <T extends { new(...args: any[]): { name: string } }>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log('Rendering with Template !!.......');
                const element = document.getElementById(hookId);
                if (element) {
                    element.innerHTML = template;
                    element.querySelector('h1')!.textContent = this.name;
                }
            }
        };
    };
}

// @Logger
@Logger('Hello I am Logging................... !')
@WithTemplate('<h1> Hooking Template </h1>', 'hookApp')
class Person {
    name = 'Max';
    constructor() {
        console.log('Creating new Person !!');
    }
}
const person = new Person();
console.log(person);

function Log(target: any, propertyName: string | Symbol) {
    console.log('Property Decorator ---------------------');
    console.log(target, propertyName);
}

// Accessor Decorator 
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor Decorator------------');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// Method Decorator
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

//Parameter Decorator
function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter Decorator -----__________-------------___________');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @Log
    title: string;
    private _price: number;

    constructor(title: string, price: number) {
        console.log('Creating Product ..................!!');
        this.title = title;
        this._price = price;
    }

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        }
        throw new Error('Invalid Price -----');
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

const product = new Product('Hello', 45);
const product2 = new Product('Hii', 456);
console.log(product, product2);

function AutoBind(target: any, methodName: string | Symbol, descriptor: PropertyDescriptor) {
    // Replacing the old methodDescriptor to new adjaDescriptor
    const originalMethod = descriptor.value;
    console.log(originalMethod);
    console.log('Method Name : ', methodName);
    console.log('Target : ' + target);

    const adjaDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            // Bind to Original Object
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    }
    return adjaDescriptor;
}

class Printer {
    message = 'Printer Message ';

    @AutoBind
    printMessage() {
        console.log(this.message);
    }
}

const printer = new Printer();
const button = document.querySelector('button')!;
// button.addEventListener('click', printer.printMessage.bind(printer));
// Using Autobind
button.addEventListener('click', printer.printMessage);

// Validations Decorators

interface ValidatorConfiguration {
    [property: string]: {
        [validatableProperty: string]: string[] // ['required','positive']
    };
}

const registeredValidator: ValidatorConfiguration = {};

function Required(target: any, propertyName: string) {
    registeredValidator[target.constructor.name] = {
        // Adding existing validators
        ...registeredValidator[target.constructor.name],
        // [propName]: ['required'],
        [propertyName] : [...registeredValidator[target.constructor.name][propertyName],'required']
    };
}

function PositiveNumber(target: any, propertyName: string) {
    registeredValidator[target.constructor.name] = {
        // Adding existing validators
        ...registeredValidator[target.constructor.name],
        // [propName]: ['positive']
        [propertyName] : [...registeredValidator[target.constructor.name][propertyName],'positive']
    };
}

function validate(obj: object | any): boolean {
    console.log('Validating Input ....................................................................');
    const objValidatorConfig = registeredValidator[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        console.log(prop);
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    }
}

const formCourse = document.querySelector('form')!;
formCourse.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const price = (document.getElementById('price') as HTMLInputElement).value;
    const course = new Course(title, +price);
    if (!validate(course)) {
        console.log('Unable to create course !! ');
        return;
    }
    console.log('Created Course : ', course);
});