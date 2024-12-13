import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule} from '@angular/material/menu';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { AboutusComponent } from './component/aboutus/aboutus.component';
import { HomeComponent } from './component/home/home.component';
import { AppHeaderComponent } from './component/app-header/app-header.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { PagingComponent } from './component/paging/paging.component';
import { AdminHeaderComponent } from './component/admin/admin-header/admin-header.component';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { AdminOrderlistComponent } from './component/admin/admin-orderlist/admin-orderlist.component';
import { CustomerHomeComponent } from './component/customer/customer-home/customer-home.component';
import { CustomerHeaderComponent } from './component/customer/customer-header/customer-header.component';
import { CustomerLoginComponent } from './component/customer/customer-login/customer-login.component';
import { CustomerCartComponent } from './component/customer/customer-cart/customer-cart.component';
import { CustomerSignupComponent } from './component/customer/customer-signup/customer-signup.component';
import { CustomerOrderComponent } from './component/customer/customer-order/customer-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ContactusComponent } from './component/contactus/contactus.component';
import { AdminFoodComponent } from './component/admin/admin-food/admin-food.component';
import { AdminListoffoodComponent } from './component/admin/admin-listoffood/admin-listoffood.component';
import { CustomerHistoryComponent } from './component/customer/customer-history/customer-history.component';
import { FooterComponent } from './component/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    HomeComponent,
    AppHeaderComponent,
    ContactusComponent,
    PagingComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    AdminHeaderComponent,
    AdminHomeComponent,
    AdminFoodComponent,
    AdminListoffoodComponent,
    AdminOrderlistComponent,
    CustomerHomeComponent,
    CustomerHeaderComponent,
    CustomerCartComponent,
    CustomerHistoryComponent,
    CustomerLoginComponent,
    CustomerOrderComponent,
    CustomerSignupComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }