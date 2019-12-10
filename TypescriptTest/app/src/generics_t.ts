// const names:Array<string> = [];

// const promise:Promise<Number> = new Promise((resolve,reject)=>{
//     setTimeout(()=>{resolve(56)},2000);
// });
// promise.then((data)=> data);

function merge(obj1: object, obj2: object) {
    return Object.assign(obj1, obj2);
}
console.log(merge({ name: 'akksks' }, { age: 34 }));
const mergedObject = merge({ name: 'Akajs' }, { age: 34 }) as { name: string, age: number };
console.log(mergedObject.age);

//Generics
function merge1<T, U>(obj1: T, obj2: U): T & U {
    return Object.assign(obj1, obj2);
}
const merge1Object = merge1<{ name: string, hover: boolean }, { age: number }>({ name: 'Akajs', hover: true }, { age: 34 });
console.log(merge1Object.hover);

// constraints 
function mergeWithConstraints<T extends object, U extends object | number | string>(obj1: T, obj2: U): T & U {
    return Object.assign(obj1, obj2);
}
const mergeWithConstraintsO = mergeWithConstraints({ name: 'Akajs', hover: true }, { age: 34 });
console.log(mergeWithConstraintsO);

interface Lengthy {
    length: number;
}
function countAndDescribe<t extends Lengthy>(element: t): [t, string] {
    let desText = 'Got no Description';
    if (element.length === 1) {
        desText = 'Got One Element .';
    }
    else if (element.length > 1) {
        desText = 'Got : ' + element.length + " elements.";
    }
    return [element, desText];
}
console.log(countAndDescribe(['Hiosksk', 'dkldkkdkd']));
console.log(countAndDescribe([]));

//keyOf
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
}
console.log(extractAndConvert({fkkf:'ajjaj'},'fkkf'));