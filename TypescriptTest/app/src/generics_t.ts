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
console.log(extractAndConvert({ fkkf: 'ajjaj' }, 'fkkf'));

class DataStorage<T extends string | boolean | number> {

    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Hello');
textStorage.addItem('Hsakka');
console.log(textStorage.getItems());
textStorage.removeItem('Hsakka');
console.log('After Removal : ', textStorage.getItems());

// const storageIt = new DataStorage<object>();
// const ob = { name: 'Max' };
// const ob2 = {name:'Menuy'};
// storageIt.addItem(ob);
// storageIt.addItem(ob2);
// console.log(storageIt.getItems());
// storageIt.removeItem(ob);
// console.log('After Removal : ', storageIt.getItems());

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createGoal(title: string, description: string, completeUntil: Date): CourseGoal {
    // Partial makes CourseGoal properties optional
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = completeUntil;
    return courseGoal as CourseGoal;
    // return {title:title,description:description,completeUntil:completeUntil};
}
console.log(createGoal('Title','Title is title',new Date()));

//makes T properties readOnly
const names:Readonly<string[]> = ['Mx','Min'];
// names.push('skks');
// names.pop('ksks');