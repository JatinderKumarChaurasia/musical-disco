class Department {
    public departmentName: string;
    public utilityName: string;
    private employees:string[] =[];
    constructor(departmentName:string,utilityName:string){
        this.departmentName = departmentName;
        this.utilityName = utilityName;
    }
    describe(this:Department){
        console.log('Department Name :',this.departmentName);
    }
    addEmployee(employee:string){
        this.employees.push(employee);
    }
    printEmployees(){
        for(const emp of this.employees){
            console.log(emp)
        }
    }
}
const tdep = new Department('Hello','Hii');
console.log('Tdep : ',tdep);
tdep.describe();
tdep.addEmployee('akks');
tdep.addEmployee('kaks');
tdep.printEmployees();
const tarra = {departmentName:'Hello',utilityName:'SSLL',describe: tdep.describe};
// tarra.describe();