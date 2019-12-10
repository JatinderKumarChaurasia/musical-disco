// type Admin = {
//     name : string;
//     priviledges: string[];
// };

// type Employee = {
//     name: string;
//     startDate : Date;
// };

interface Admin {
    name: string;
    priviledges: string[];
}

interface Employee {
    name: string;
    startDate: Date;
};

// Intersection 
type ElevatedEmployee = Admin & Employee;
// interface ElevatedEmployee extends Admin, Employee { }

const ee: ElevatedEmployee = {
    name: 'Admin',
    priviledges: ['a', 'b'],
    startDate: new Date()
};

type Numeric = number | boolean;
type Combinable = string | number;
// Intersection
type Universal = Numeric & Combinable;//commons 
// Overloading
function check(a: number, b: number): number;
function check(a: string, b: string): string;
function check(a: string, b: number): string;
function check(a: number, b: string): string;
function check(a: Combinable, b: Combinable): Combinable {

    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;

}
console.log(check(5, 6));
console.log(check('rkfkf', 'fjfjj'));
const rers = check('amka', 4);
rers.split(' ');

// Optional Chaining 
const fetchedUser = {
    id: '4994', 
    name: 'Tata',
    job: {
        title: ['Consultancy services', 'IT services'],
        description: 'Varied company'
    }
}
// Nullish coalescing
// Nullish coalescing(??) operator is a logical operator that returns its right-hand side operand when its 
// left-hand side operand is null or undefined , and otherwise returns its left-hand side operand
// console.log(fetchedUser?.job?.title);

// const userInput = '';
// const storeData = userInput ?? 'DEFAULT';
// console.log(storeData);
// Union
type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(employee: UnknownEmployee) {
    console.log('Name : ', employee.name);
    if ('priviledges' in employee) {
        console.log('Priviledges : ', employee.priviledges);
    }
    if ('startDate' in employee) {
        console.log('Start Date : ', employee.startDate);
    }
}
printEmployeeInfo(ee);
class Car {
    constructor() { }
    drive() {
        console.log('Driving Mode On Car : -=-=-=-=-=-=-=-=-=-=-=-=-=');
    }
}
class Truck {
    constructor() {

    }
    drive() {
        console.log('Driving Mode On Truck : -=-=-=-=-=-=-=-=-=-=-=-=-=');
    }
    loadCargo(amount: number) {
        console.log('Weight Of Truck : ' + amount);
    }
}
const veh1 = new Car();
const veh2 = new Truck();
type Vehicle = Car | Truck;
function useVehicle(vehicle: Vehicle) {
    if (vehicle instanceof Car) {
        vehicle.drive();
    }
    if (vehicle instanceof Truck) {
        vehicle.drive();
        vehicle.loadCargo(50);
    }
}
useVehicle(veh2);
useVehicle(veh1);
// Discriminated Union
interface Bird {
    type: 'bird';
    flyingSpeed: number;
}
interface Horse {
    type: 'horse';
    runningSpeed: number;
}
type Animal = Bird | Horse;
function movement(animal: Animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            console.log('Bird flying with speed : ' + animal.flyingSpeed);
            break;
        case 'horse':
            speed = animal.runningSpeed;
            console.log('Horse running with speed : ' + animal.runningSpeed);
            break;
        default:
            return;
    }
    console.log('moving with speed : ' + speed);
}
movement({ type: 'bird', flyingSpeed: 34 });
//Type Casting 
// ! define that input cannot be null
// const input = <HTMLInputElement>document.getElementById('message')!;
// for React 
// const input = document.getElementById('message')! as HTMLInputElement;
const input = document.getElementById('message');
if (input) {
    (input as HTMLInputElement).value = 'HSelloe';
}

// Index 
interface ErrorContainer {
    // id:string; // errorIdentifier
    // must have keyProperty type of string and value is of type string
    [keyProperty: string]: string; // index Type
}
const errorBag: ErrorContainer = {
    email: 'Not a valid email',
    username: 'Must start with capital letter!'

}