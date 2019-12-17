import { IsNotEmpty, IsNumber, IsNegative } from '../../node_modules/class-validator/index';
export class Product {
    @IsNotEmpty()
    title: string;
    @IsNumber()
    @IsNegative()
    price: number;

    constructor(title: string, price: number) { this.title = title; this.price = price; }
    getInformation(): void {
        console.log(`Product Information : [\n Title: ${this.title} \n Price: ${this.price}]`);
    }
}