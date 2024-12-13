import { Component } from '@angular/core';
import { Food } from '../../model/food.model';
import { FoodstoreService } from 'src/app/foodstore.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-admin-listoffood',
  templateUrl: './admin-listoffood.component.html',
  styleUrls: ['./admin-listoffood.component.css']
})
export class AdminListoffoodComponent {

  foodList: Array<Food> = [];
  getCategoryList: any[] = [];
  category: any = 100;
  allFoodList: Array<Food> = [];
  offset: number = 0;
  pageSize: number = 5; // How many item you want to display in your page.
  totalItem: number = 1;

  constructor(
    private foodservice: FoodstoreService,
    private router: Router
  ) {
    this.foodservice.isCustomerLoginPresent();
    this.getFoodList(true);
  }

  ngOnInit(): void {
    this.getCategoryList = this.foodservice.getCategoryList();
    console.log("*******",this.getCategoryList);
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

  delFood(food: Food): void {
    this.foodservice.deleteFood(food?.foodId).pipe(take(1)).subscribe(
      (res: any) => {
        
        alert("Food deleted sucessfully");
        this.getFoodList(this.category === 100 || this.category === "100");
      }, err => {
        console.log("Error");
    
      }
    )
  }

  editFood(food: Food): void {
    this.router.navigate(['/admin/food'], {
      queryParams: {
        id: food?.foodId
      }
    });
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
