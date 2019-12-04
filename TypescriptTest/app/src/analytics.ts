let logged;
function sendAnalytics(data: any) {
    console.log(data);
    logged = true;
}
sendAnalytics('Hello I am Sending Analytics!!!')
const add = (...numbers: number[]) => {
    return numbers.reduce((prevVal, currVal) => {
        return prevVal + currVal;
    }, 0);
}
console.log(add(1, 3, 5, 6, 3.6));
const activeOne = ['Helo', 'Yoir', 'Main'];
const hobbies = ['ANaka'];
hobbies.push(...activeOne);
console.log(hobbies);
const person: {
    name1: string;
    age: number;
} = {
    name1: 'Max',
    age: 34
}
console.log(person);
const person1 = { ...person };
console.log(person1);
const [hob, hob2, ...remain ] = hobbies;
console.log(hob,hob2,remain);
const {name1:asUserName} = person;
console.log(asUserName);