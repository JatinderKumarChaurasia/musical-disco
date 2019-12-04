const button = document.querySelector('button');
const inp1 = document.getElementById('num1')! as HTMLInputElement;
const inp2 = document.getElementById('num2')! as HTMLInputElement;
enum Role { ADMIN = 5, USER = 4, DEVELOPER = 3 };
type customType = string;
let userInput: unknown;
userInput = 'KKKAK';
const person = {
    name: 'Max',
    age: 3455
};
const person1: object = {
    name: 'Max1',
    age: 34
};
const person2: {} = {
    name: 'Max2',
    age: 345
};
const person3: {
    name: string | number;
    age: number;
    hobbies: customType[];
    role: [number, string]; //tuple
    user: Role
} = {
    name: 'Shiva',
    age: 24,
    hobbies: ['Hello'],
    role: [2, 'fdkfk'],
    user: Role.DEVELOPER
}
function test() {
    console.log('type of Person : ', typeof person);
}
function add(inp1: number | string, inp2: number | string, resultConversion: string) {
    test();
    console.log('Person : ', person.age);
    console.log('Person 3 : ', person3.age);
    console.log('Person 2 : ', typeof person2);
    console.log(typeof inp1)
    if (resultConversion === 'asme') {
        console.log('Additon ', +inp1, +inp2)
    } else {
        console.log(inp1.toString() + inp2.toString());
    }
}
function sun(int: number): number {
    return int;
}
let Funct: Function = add;
let func2: (int: number) => number;
func2 = sun
button.addEventListener('click', () => {
    console.log('Type Of Person 1', typeof person1);
    generateError('A messazg is rj',4404);
    console.log(addHandle(435, 354, (num) => {
        console.log('Hello I am Rocm : ', num);
    }))
    console.log('Func 2 : ', func2(34))
    console.log('Funct : ', Funct(inp1.value, inp2.value, 'asme'));
});
let abs: any[] = ['Hello', 324];

function sun1(int: number): void {
    console.log(int);
}
function sun2(int: number): undefined {
    return undefined;
}
function sun3(int: number): any {
    console.log(int);

    return int;
}
function addHandle(input1: number, input2: number, cb: (num: number) => void) {
    const result = input1 - input2;
    cb(result);
}
function generateError(msg: string, code: number): never {
    throw { msg: msg, code: code };
}