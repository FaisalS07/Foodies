import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { FoodstoreService } from 'src/app/foodstore.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{


  email: string= '';
  isShowChangePassword: boolean = false;
  newPassword: string = '';
  customer: any;

  constructor(
    private foodservice: FoodstoreService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const body = {
      emailID: this.email
    };
    this.foodservice.forgotPassword(body).pipe(take(1)).subscribe((res) => {
      if (!!res && res?.customerId) {
        this.customer = res;
        this.isShowChangePassword = true;
      }
    }, err => {
      this.isShowChangePassword = false;
      alert("Customer not found . Please enter valid email.")
    });
  }

  onChangePassword(): void {
    this.customer.password = this.newPassword;
    this.foodservice.changePassword(this.customer?.customerId,this.newPassword).pipe(take(1)).subscribe((res) => {
      if (res && res.customerId) {
        alert("Password changed successfully");
        this.route.navigate(["/login"]);
      }
    }, error => {
      alert("Error occured while changing password.");
    });
  }
}
