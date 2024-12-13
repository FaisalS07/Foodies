import { Component, OnInit } from '@angular/core';
import { FoodstoreService } from 'src/app/foodstore.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit {
  userName: string = '';
  constructor(
    private foodservice: FoodstoreService
  ) {
    if (this.foodservice.getAdminName() !== null) {
      this.userName = this.foodservice.getAdminName();
    }
    this.foodservice.isCustomerLoginPresent();
  }

  ngOnInit(): void {
  }

}
