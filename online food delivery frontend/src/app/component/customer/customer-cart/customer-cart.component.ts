import { Component, OnInit } from '@angular/core';
import { Cart } from '../../model/cart.model';
import { FoodstoreService } from 'src/app/foodstore.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { forkJoin, take } from 'rxjs';
import * as _ from "lodash";
import { Food } from '../../model/food.model';

@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})
export class CustomerCartComponent implements OnInit {

  cartList: Cart[] = [];
  cartListBackup: Cart[] = [];
  grandTotal: number = 0;
  customer: any = {};


  constructor(
    private foodservice: FoodstoreService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.foodservice.isCustomerLoginPresent();
    this.getCartList();
    this.getCustomerDetail();
  }

  ngOnInit(): void {
  }
  getCartList(): void {
    this.foodservice.cartList().pipe(take(1)).subscribe(
      (res: any) => {
        console.log("****", res);
        if (!!res && Array.isArray(res)) {
          const customerFilter = res.filter((item: Cart)=> item?.customer?.customerId === parseInt(this.foodservice.getCustomerAuthorization()));
          console.log("customer filter::::::",customerFilter);
          this.cartList = customerFilter;
          this.cartListBackup =  _.cloneDeep(customerFilter);
          if (this.cartList.length > 0) {
            this.cartList.map((item: Cart) => {
              this.grandTotal += (item?.mrpPrice * item?.quantity);
            })
          }
        }
      }, err => {
        console.log("error");
      }

    );
  }
  getTotal(quantity: number = 0, mrpPrice: number = 0): number {
    return quantity * mrpPrice;
  }
  
  placeOrder(): void {
    let totalPrice: number = 0;
    const deleteCartReq:any[]=[];
    const foodItems: Array<Food> = [];
    this.cartList.forEach((item: Cart) => {
      foodItems.push(item?.food);
      totalPrice += (item?.mrpPrice * item?.quantity);
      deleteCartReq.push(this.foodservice.placeCart(item?.cartId));
    });
    console.log('>>>>>>>>', totalPrice)
    const body: any = {
      totalPrice: totalPrice,
      orderStatus: "success",
      paymentStatus: "success",
      orderedDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      customer: this.customer,
      foodname: 'xxxxx',
      image: 'xxxxx',
      food: foodItems
    };
    this.foodservice.placeOrderItem(this.customer?.customerId, body).pipe(take(1)).subscribe((res: any) => {
      console.log('>>>>>>>', res);
      forkJoin(deleteCartReq).pipe(take(1)).subscribe();
      alert("Place order Sucessfully");
      this.router.navigate(["/customer/order"]);
    })


  }
  getCustomerDetail(): void {
    const cid = this.foodservice.getCustomerAuthorization();
    this.foodservice.getCustomerById(cid).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("Customer***", res);
        if (!!res && res?.customerId) {
          this.customer = res;
        }
      }, err => {
        console.log("Err");
      }
    )
  }

  deleteCart(cart:Cart, showAlert: boolean = true):void{
    this.foodservice.deleteCart(cart?.cartId).pipe(take(1)).subscribe(
      (res: any) => {
        if (showAlert) {
          alert("Food deleted successfully");
        }
       
        this.getCartList();
      }, err => {
        console.log("Err");
      }
    )
  }

  placeCart(cart:Cart, showAlert: boolean = true):void{
    this.foodservice.placeCart(cart?.cartId).pipe(take(1)).subscribe(
      (res: any) => {
        if (showAlert) {
          alert("Food placed successfully");
        }
       
        this.getCartList();
      }, err => {
        console.log("Err");
      }
    )
  }

  onIncreaseQunatity(cart: Cart): void {
    const index = this.cartList.findIndex((item: Cart) => item.cartId === cart?.cartId);
    // const bac = Object.assign(this.cartListBackup);
    const indexBackup = this.cartListBackup.findIndex((item: Cart) => item.cartId === cart?.cartId);
    const qty = cart.quantity + 1;
    console.log( this.cartListBackup[indexBackup].quantity , '>>>>>>' , (cart.food?.quantity ))
    if (qty > (cart.food?.quantity  + this.cartListBackup[indexBackup].quantity) ) {
      alert('Added quantity should not greater than avaiable quantity');
      return;
    }
    this.cartList[index].quantity = qty;
    this.updateGrantTotal();
  }

  onDecreaseQunatity(cart: Cart): void {
    const index = this.cartList.findIndex((item: Cart) => item.cartId === cart?.cartId);
    const qty = cart.quantity - 1;
    if (qty === 0) {
      this.deleteCart(cart, false);
    }
    this.cartList[index].quantity = qty;
    this.updateGrantTotal();
  }

  updateGrantTotal(): void {
    let total = 0;
    this.cartList.map((item: Cart) => {
      total+= (item?.mrpPrice * item?.quantity);
     
    })
    this.grandTotal = total;
  }

}
