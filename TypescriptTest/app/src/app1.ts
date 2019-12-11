'use strict';

module inheritance{
    interface Named {
        readonly name?: string;
        age?: number;
        outputName?: string;
    }
    interface Greetable extends Named, CSS {
    
    
        greet(sentence: string): void;
    
    }
    // type Greetable = {
    
    //     readonly name: string;
    //     age: number;
    
    //     greet(sentence: string): void;
    
    // }
    
    
    class Person implements Greetable {
        escape(value: string): string {
            console.log(value);
            return value;
        }
        supports(property: string, value?: string | undefined): boolean {
            console.log('Property : ' + property + ' has value : ' + value);
            return true;
        }
        name?: string;
        age?: number;
        email?: string;
        constructor(name?: string, age?: number, email?: string) {
            if (this.name) {
                this.name = name;
            }
            if (this.age) {
                this.age = age;
            }
            if (this.email) {
                this.email = email;
            }
            // this.name = name;
            // this.age = age;
            // this.email = email;
        }
        greet(sentence: string): void {
            if (this.age && this.name) {
                console.log('Sentence : ' + sentence, '\t Name : ' + this.name, '\t Age : ' + this.age);
            } else {
                console.log('Hii');
            }
        }
    
    
    }
    let user1: Greetable;
    let user2: Greetable;
    user2 = new Person();
    console.log(user2);
    user2.greet('How are you : ');
    user1 = {
        name: ' Vijay',
        age: 34,
        greet(sentence: string) {
            if (this.name) {
                console.log('Sentence : ' + sentence, '\t Name : ' + this.name);
            } else {
                console.log('Hii');
            }
        },
        escape(value: string) { return value; },
        supports(property: string, value: string) {
            console.log('Property : ' + property + ' has value : ' + value);
            return true;
        }
    };
    user1.greet('Hello! How are your!');
    user2.escape('Why');
    
    // type AddFunct = (a:number,b:number)=> number;
    interface AddFunct {
        (a1: number, a2: number): number;
    }
    let addition: AddFunct;
    addition = (n1: number, n2: number) => {
        return n1 + n2;
    }
    addition(3,5);
    
}
// Contract - Blueprint
// Use for structure of object 
