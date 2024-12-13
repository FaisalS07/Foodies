import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutusComponent } from './component/aboutus/aboutus.component';
import { ContactusComponent } from './component/contactus/contactus.component';
import { CustomerLoginComponent } from './component/customer/customer-login/customer-login.component';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { CustomerHomeComponent } from './component/customer/customer-home/customer-home.component';
import { AdminListoffoodComponent } from './component/admin/admin-listoffood/admin-listoffood.component';
import { AdminFoodComponent } from './component/admin/admin-food/admin-food.component';
import { AdminOrderlistComponent } from './component/admin/admin-orderlist/admin-orderlist.component';
import { CustomerCartComponent } from './component/customer/customer-cart/customer-cart.component';
import { CustomerOrderComponent } from './component/customer/customer-order/customer-order.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { CustomerSignupComponent } from './component/customer/customer-signup/customer-signup.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'contactus',component:ContactusComponent},
  {path:'login',component:CustomerLoginComponent},
  {path :'forgot-password', component :ForgotPasswordComponent},
  {path : 'customer-register',component :CustomerSignupComponent},

  {path:'admin',children:[
    {path:'home',component:AdminHomeComponent},
    { path: 'food',component:AdminFoodComponent},
    { path: 'listoffood',component:AdminListoffoodComponent},
    { path: 'orderlist',component:AdminOrderlistComponent}
  
  ]},
  {path:'customer',children:[
    {path:'home',component:CustomerHomeComponent},
    { path: 'cart', component: CustomerCartComponent },
    { path: 'order', component: CustomerOrderComponent },
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }