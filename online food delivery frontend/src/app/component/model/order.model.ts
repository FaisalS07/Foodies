import { Food } from "./food.model";

export interface Order{
    mrpPrice : number;
    orderId : number;
    orderStatus:string;
    orderedDate:string;
    paymentStatus:string;
    quantity : number;
    totalPrice: number;	
    foodname: string;
    image: string;
    food: Array<Food>;
}