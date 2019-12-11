/**
 * 
 * @param constructor 
 * @name decorators training
 * @author Jatinder Kumar Chaurasia
 */




// Decorators 
// function Logger(constructor: Function) {
//     console.log('Logging..............');
//     console.log(constructor);
// }

// Factory Decorators
function Logger1(logString: string) {
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    return function (constructor: Function) {
        const element = document.getElementById(hookId);
        if(element){
            
        }
    }
}

// @Logger
// @Logger1('Hello I am Logging................... !')
@WithTemplate('', 'hookApp')
class Person {
    name = 'Max';
    constructor() {
        console.log('Creating new Person !!');
    }
}
const person = new Person();
console.log(person);