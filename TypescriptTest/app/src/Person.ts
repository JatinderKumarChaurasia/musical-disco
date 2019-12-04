class Person{

    constructor(public name:string,public age:number,public email:string,private readonly id?:number){
        // property is also created and assigned passed value
        if(id){
            this.id = id;
        }else{
            this.id = Math.random()*124994;
        }
    }
    getInfo(this:Person){
        console.log(`Person [ Id : ${this.id} \n Name : ${this.name} \n Age : ${this.age} \n Email : ${this.email}]`)
    }
    getId(){
        return this.id;
    }
}
const persoasn = new Person('Aala',34,'skks');
persoasn.getInfo();
