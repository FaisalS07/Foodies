import { Component } from '@angular/core';
import { Order } from '../../model/order.model';
import { FoodstoreService } from 'src/app/foodstore.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-admin-orderlist',
  templateUrl: './admin-orderlist.component.html',
  styleUrls: ['./admin-orderlist.component.css']
})
export class AdminOrderlistComponent {

  orderList: Order[] = [];
  tempOrderList: Order[] = [];
  today = new Date();
  constructor(
    private foodservice:FoodstoreService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.foodservice.isCustomerLoginPresent();
  }

  ngOnInit(): void {
    this.getOrderList();
  }
  getOrderList(): void {
    this.foodservice.getAllorderList().pipe(take(1)).subscribe(
      (res: any) => {
        if (!!res && Array.isArray(res)) {
          this.orderList = res;
          this.tempOrderList = res;
        }
      }, err => {
        console.log("Error");
      }
    )
  }
  getDate(d: string | undefined): any {
    let ans: any;
    if (!!d && d !== null) {
      ans = this.datePipe.transform(d, "shortDate") || null;
    }
    return ans;
  }

  changeDate(ev: any): void {
    
    const date: string = this.datePipe.transform(ev?.value, 'yyyy-MM-dd')?.toString() || '';
    this.orderList= this.tempOrderList.filter((item: Order) => new Date(item?.orderedDate).getTime() === new Date(date).getTime() );
  }
}