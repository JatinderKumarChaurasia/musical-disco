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

function check(a: Combinable, b: Combinable): Combinable {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
console.log(check('sksk', 54));
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