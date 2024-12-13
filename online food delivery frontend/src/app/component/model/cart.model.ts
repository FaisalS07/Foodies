import { Food } from "./food.model";

export interface Cart{
    cartId : number;
    mrpPrice : number;
    quantity : number;
    customer : any;
    food : Food
}