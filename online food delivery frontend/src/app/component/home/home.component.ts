import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  gotoLogin(): void {
    this.route.navigate(['/login'])
  }


  logo: string = "../../../assets/Images/logo1.png";
  images = [
    '../../../assets/Images/food2.jpg',
    '../../../assets/Images/food1.jpg',
    '../../../assets/Images/food3.jpg',
    '../../../assets/Images/food4.jpeg',
  ];

  constructor(
    config: NgbCarouselConfig,
    private route: Router
  ) {
    config.interval = 2000;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
  }

  
}