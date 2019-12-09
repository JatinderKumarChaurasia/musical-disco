enum Platform {
    ADMIN = 1,
    USER = 2,
    IT = 3
}
abstract class Person1 {

    static platform = Platform.ADMIN.toLocaleString();
    protected peoples: string[] = [];
    constructor(public name: string, public age: number, public email: string, public deptName: string, protected readonly id?: number) {
        // property is also created and assigned passed value
        if (id) {
            this.id = id;
        } else {
            this.id = Math.random() * 124994;
        }
    }
    abstract getInfo(this: Person): void;// {
    //     console.log(`Person [ Id : ${this.id} \n Name : ${this.name} \n Age : ${this.age} \n Email : ${this.email} \n Department : ${this.deptName}]`)
    // }
    getId() {
        return this.id;
    }
    addPeople(emp: string) {
        this.peoples.push(emp);
    }
    getPeoples() {
        console.log(this.peoples);
    }
    static createPeople(peopleName: string) {
        return {
            name: peopleName
        };
    }
}

class ITPerson extends Person1 {

    admins: string[];
    constructor(id: number, admins: string[]) {
        super('Arun', 32, 'it@mail.com', 'IT', id);
        this.admins = admins;
    }
    getInfo() {
        console.log(`IT Department : Person [ Id : ${this.id} \n Name : ${this.name} \n Age : ${this.age} \n Email : ${this.email} \n Department : ${this.deptName}]`)
    }
}

class AccountPerson extends Person1 {

    // Abstract class Method
    getInfo() {
        console.log(`Account Department : Person [ Id : ${this.id} \n Name : ${this.name} \n Age : ${this.age} \n Email : ${this.email} \n Department : ${this.deptName}]`)
    }

    //INSTANCE
    private static instance: AccountPerson;

    private lastReport: string;
    private constructor(protected id: number, private reports: string[]) {
        super('Shivani', 32, 'it@mail.com', 'Accounting', id);
        this.lastReport = reports[0];
    }

    // Singleton class instance;
    static getInstance() {
        if (AccountPerson.instance) {
            return this.instance;
        }
        this.instance = new AccountPerson(34, []);
        return this.instance;
    }

    //Getter and Setter
    get recentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        // return 'null';
        throw new Error('NO LAST REPORT');
    }

    set recentReport(value: string) {
        if (!value) {
            throw new Error('Invalid Value! \n\n');
        }
        this.addReport(value);
        this.lastReport = value;
    }

    addPeople(name: string) {
        if (name.length <= 2) {
            return;
        }
        this.peoples.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }
    getReports() {
        return this.reports;
    }
}
const persoasn = new ITPerson(34, ['Admin']);
console.log(persoasn);
persoasn.addPeople('Sekek');
persoasn.getInfo();
persoasn.getPeoples();

const accounting = AccountPerson.getInstance();
accounting.addReport('Report 1');
accounting.addReport('Report 2');
accounting.addPeople('pe');
accounting.addPeople('People 01');
accounting.addPeople('People 02');
console.log(accounting.getReports());
accounting.getPeoples();
accounting.getInfo();
accounting.recentReport = accounting.getReports()[accounting.getReports().length - 1];
console.log(accounting.recentReport);
const emplot = Person1.createPeople('eloeoo');
console.log(emplot, Person1.platform);

