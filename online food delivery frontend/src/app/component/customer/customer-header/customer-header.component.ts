import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FoodstoreService } from 'src/app/foodstore.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent implements OnInit {

  url: string = "/customer/home";
  userName: string = '';
  constructor(
    private foodservice : FoodstoreService,
    private router:Router
  ) {
    if (this.foodservice.getCustomerName() !== null) {
      this.userName = this.foodservice.getCustomerName();
    }
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: any) => {
      this.url = event?.url;
    });
  }
  routerToLink(link: string): void {
    if (link === '/customer/logout') {
      this.foodservice.customerLogout();
      return;
    }
    this.router.navigate([link]);
  }

}

