import { Component, OnInit } from '@angular/core';
import { Food } from '../../model/food.model';
import { FoodstoreService } from 'src/app/foodstore.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {

  foodList: Array<Food> = [];
  quantity: number = 0;
  customer: any = {};
  getCategoryList: any[] = [];
  category: any = 100;
  allFoodList : Array<Food>= [];
  offset: number = 0;
  pageSize: number = 5; // How many item you want to display in your page.
  totalItem: number = 1;

  constructor(
    private foodservice: FoodstoreService,
    private router: Router,
    private snakcbar: MatSnackBar
  ) {
   this.foodservice.isCustomerLoginPresent();
    this.getFoodList(true);
    this.getCustomerDetail();
  }


  ngOnInit(): void {
    this.getCategoryList = this.foodservice.getCategoryList();
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

  getFoodList(isAllFood: boolean = false): void {
    let food: any = this.foodservice.getAllFoods(this.offset - 1 < 0 ? 0 : this.offset - 1, this.pageSize);
    if (!isAllFood) {
      food = this.foodservice.getFoodByCategory(this.category, this.offset - 1 < 0 ? 0 : this.offset - 1, this.pageSize);
    }
    food.pipe(take(1)).subscribe((res: any) => {
      ;
      if (res && res?.food && Array.isArray(res?.food)) {
        this.foodList = res?.food;
        this.allFoodList = res?.food;
        this.totalItem = res?.totalFood;
      }
    }, (err: any) => {
      console.log("Error");
    });
  }

  addToCart(food: Food): void {
    const element: any = document.getElementById(food?.foodId.toString());
  let qty:any= element!==null ? element.value : 0; 
  if(qty ===""){
    element.value=0;
    qty=0;
  }
    if (qty === 0 || qty === "0" || qty <0) {
      alert("Quantity must be more than zero");
      return ;
    }

    if (qty > food?.quantity) {
      alert('Added quantity should not greater than available quantity');
      return;
    }
    
    const body: any = {
      quantity: qty,
      mrpPrice: food?.mrpPrice,
      food: food,
      customer: this.customer
    };
    
    console.log("add to cart", body);
    this.foodservice.addToCart(body, food?.foodId, this.customer?.customerId).pipe(take(1)).subscribe(
      (res: any) => {
        console.log(res);
        if (!!res && res?.cartId) {
        alert("Item added sucessfully");
        this.router.navigate(["/customer/cart"]);
        this.getFoodList(true);
        }
      }, err => {
        console.log("Error");
      }
    )
  }

  getFoodByCategory(): void {
    this.offset = 0;
    this.totalItem = 1;
    if (this.category === "100") {
      this.getFoodList(true);
    } else {
      this.getFoodList(false);
    }
  }

  onNextPageClick(pageOffSet: any): void {
    this.offset = pageOffSet;
    this.getFoodList(this.category === 100 || this.category === "100");
  }

  onPreviousPageClick(pageOffSet: any): void {
    this.offset -= 1;
    this.getFoodList(this.category === 100 || this.category === "100");
  }

  onFirstPageClick(pageOffSet: any): void {
    this.offset = 0;
    this.getFoodList(this.category === 100 || this.category === "100");
  }

  onLastPageClick(pageOffSet: any): void {
    const lastPage = Math.ceil(this.totalItem / this.pageSize);
    this.offset = lastPage;
    this.getFoodList(this.category === 100 || this.category === "100");
  }

}