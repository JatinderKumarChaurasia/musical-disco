/**
 * 
 * @param constructor 
 * @name decorators training
 * @author Jatinder Kumar Chaurasia
 */




// Factory Decorators

// function Logger(constructor: Function) {
//     console.log('Logging..............');
//     console.log(constructor);
// }

function Logger(logString: string) {
    console.log('Rendering with Logger Factory !!.......');
    return function (constructor: Function) {
        console.log('Rendering with Logger !!.......');
        console.log(logString);
        console.log(constructor);
    }
}

// function WithTemplate(template: string, hookId: string) {
//     return function (_: Function) {
//         const element = document.getElementById(hookId);
//         if(element){
//             element.innerHTML = template;
//         }
//     }
// }


function WithTemplate(template: string, hookId: string) {
    console.log('Rendering with Template Factory !!.......');
    return function (constructor: any) {
        console.log('Rendering with Template !!.......');
        const element = document.getElementById(hookId);
        const p = new constructor();
        if(element){
            element.innerHTML = template;
            element.querySelector('h1')!.textContent = p.name;
        }
    }
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