// this is for add food items 

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodstoreService } from 'src/app/foodstore.service';
import { Food } from '../../model/food.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-admin-food',
  templateUrl: './admin-food.component.html',
  styleUrls: ['./admin-food.component.css']
})
export class AdminFoodComponent implements OnInit{

  foodname: string = '';
  image: string = '';
  description: string = '';
  mrpPrice: number = 0;
  quantity: number = 0;
  isEdit: boolean = false;
  foodId: any;
  getCategoryList: any[] = [];
  category: number = 0;

  constructor(

    private foodservice: FoodstoreService,
    private router: Router,
    private activateRouter: ActivatedRoute


  ) {
    this.activateRouter.queryParams.subscribe((params: any) => {
      if (params?.id) {
        this.isEdit = true;
        this.foodservice.getFoodById(params?.id).pipe(take(1)).subscribe((res:any)=> {
          if(!!res && res?.foodId){
          
            const food :Food=res;
            console.log('>>>>', food);
            this.foodname= food?.foodname;
            this.description=food?.description;
            this.image=food?.image;
            this.mrpPrice=food?.mrpPrice;
            this.quantity=food?.quantity;
            this.foodId=food?.foodId;
            const categoryName = this.getCategoryList.find((cate: any) => cate?.name.toString() === food?.category)?.value;
            this.category = categoryName;
          }
          console.log(res);
        });
      }

    })
  }
  ngOnInit(): void {
    this.foodservice.isCustomerLoginPresent();
    this.getCategoryList = this.foodservice.getCategoryList();
  }

  onAddFood(): void {
   
    if (this.foodname === '') {
      alert("Food name is required");
      return;
    }
    if (this.image === '') {
      alert("Image should not be blank");
      return;
    }
    if (this.description === '') {
      alert("description  is required");
      return;
    }

    
    console.log("******MRP price",this.mrpPrice);
    if (this.mrpPrice === 0 || this.mrpPrice===null || this.mrpPrice <0) {
      alert("MRP Price should not be zero/blank  and negative");
      return;
    }
    if (this.quantity === 0|| this.quantity===null || this.quantity <0) {
      alert("Quantity should not be zero/blank and negative");
      return;
    }
    
 

    const body: any = {
      foodname: this.foodname,
      image: this.image,
      description: this.description,
      mrpPrice: this.mrpPrice,
      quantity: this.quantity,
      category: this.category,
      
    }
    if(this.isEdit){
      
      console.log("=======>", body);
    this.foodservice.editFood(body,this.foodId).pipe(take(1)).subscribe((res: any) => {
      console.log("*****", res);
      if (res && res?.foodId) {
        alert("Food updated sucessfully");
        this.router.navigate(["/admin/listoffood"]);
      }
    }, err => {
      console.log("Error  ", err);
      alert("Something going wrong!! Please try again");
    })
    }else{
      console.log("=======>", body);
      this.foodservice.addFood(body).pipe(take(1)).subscribe((res: any) => {
        console.log("*****", res);
        if (res && res?.foodId) {
          alert("Food added sucessfully");
          this.router.navigate(["/admin/listoffood"]);
        }
      }, err => {
        console.log("Error  ", err);
        alert("Something going wrong!! Please try again");
      })
    }
  }
}
