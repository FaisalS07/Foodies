import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodstoreService {

  url: string = 'http://localhost:8085';

  category: any = [{
    name: "IceCreams" , value: 0,
  }, {
    name: "Starters", value: 1,
  }, {
    name: "Desserts", value: 2
  }, {
    name: "SoftDrinks", value:  3
  }, {
    name: "Chinese", value:  4
  }, {
    name: "Pizza", value:  5
  }, {
    name: "Burgers", value: 6
  }, {
    name : "ColdCoffee", value: 7
  }, {
    name: "Cakes",value:8
  }, {
    name: "Mocktails", value:9
  }, {
    name: "Juices", value:10
  }, {
    name:"Momos" , value:11
  }, {
  name:"Thali" , value:12
  }, {
  name:"Frankie" , value:13
  }, {
  name:"Shawarma" , value:14
}
]

  constructor(
    private http:HttpClient,
    private router:Router
    
  ) { }

/*----------Admin Registration--------------*/

//admin sign in
  adminSignIn(body: any): Observable<any> {
    return this.http.post(this.url + "/api/admin/login", body);
  }
  storeAdminAuthorization(token: string): void {
    localStorage.setItem("admin", token);
  }
  getAdminAuthorization(): any {
    const token = localStorage.getItem("admin");
    return token;
  }
  storeAdminUserName(name: string): void {
    localStorage.setItem("adminName", name);
  }
  getAdminName(): any {
    const name = localStorage.getItem("adminName");
    return name;
  }
  adminLogout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  // this is to get username in admin.home.html part via admin.home.ts
  isAdminLoginPresent(): void {
    if (this.getAdminAuthorization() === null) {
      this.router.navigate(['/admin-login']);
    }
  }

  isCustomerLoginPresent(): void {
    if (this.getCustomerAuthorization() === null) {
      this.router.navigate(['/customer-login']);
    }
  }

/*-----Customer--------*/

  signUp(body: any): Observable<any> {
    return this.http.post(this.url + "/api/customer/register", body);
  }
  //customer login signin
  customerSignIn(body: any): Observable<any> {
    return this.http.post(this.url + "/api/customer/login", body);
  }
  //once we logged in that time we are storing client id into token 
  storeCustomerAuthorization(token: string): void {
    localStorage.setItem("token", token);
  }
  getCustomerAuthorization(): any {
    const token = localStorage.getItem("token");
    return token;
  }
  storeCustomerUserName(name: string): void {
    localStorage.setItem("userName", name);
  }
  getCustomerName(): any {
    const name = localStorage.getItem("userName");
    return name;
  }
  getCustomerById(id:any):Observable<any> {
    return this.http.get(this.url + "/api/customer/customer/"+id);
  }
  customerLogout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }



/*-----Food----*/

addFood(body: any): Observable<any> {
  return this.http.post(this.url + "/api/food/addfood", body);
}

getFoodlist():Observable<any> {
  return this.http.get(this.url + "/api/food");

}

deleteFood(id :any):Observable<any> {
  //return this.http.delete(this.url + "/api/products/" +id);
  //secondway
  //return this.http.delete(`${this.url}/api/food/${id}`);
  return this.http.delete(this.url + "/api/food/" +id);
}

getFoodById(id:any):Observable<any> {
  return this.http.get(this.url + "/api/food/food/"+id);
}
editFood(body: any,id:any): Observable<any> {
  return this.http.put(this.url + "/api/food/"+id, body);
}

addToCart(body: any,fid:any,cid:any):Observable<any>{
  return this.http.post(this.url+"/api/cart/"+cid+"/"+fid,body);
}

cartList():Observable<any>{
  return this.http.get(this.url+"/api/cart/list");
}


placeOrder(cid:any,cartid:any,body:any):Observable<any> {
  return this.http.post(this.url + "/api/orders/"+cid+"/"+cartid, body);
}
deleteCart(id :any):Observable<any> {
  return this.http.delete(`${this.url}/api/cart/${id}`);
}
placeCart(id :any):Observable<any> {
  return this.http.delete(`${this.url}/api/cart/place/${id}`);
}




orderList(id:any):Observable<any>{
  return this.http.get(this.url+"/api/orders/"+id);
}



getCategoryList(): any {
  return this.category;
}



addPayment(body:any,orderid:any,cid:any):Observable<any> {
  return this.http.post(this.url + "/api/payements/"+orderid+"/"+cid, body);
}

forgotPassword(body: any):Observable<any> {
  return this.http.post(this.url + "/api/customer/forgotpassword", body);
}


updateCustomerInformation(body: any):Observable<any> {
  return this.http.put(this.url + "/api/customer/customer/"+body?.customerId, body);
}

changePassword(cid: any,password:any):Observable<any> {
  return this.http.post(this.url + "/api/customer/"+cid+"/"+password,{});
}



getFoodByCategory(cid: any, offset: any, limit: any):Observable<any>{
  return this.http.get(this.url+"/api/food/" + cid + "/"+ offset + "/" + limit);
}

getAllFoods(offset: any, limit: any):Observable<any>{
  return this.http.get(this.url+"/api/food/" + offset + "/" + limit);
}


getAllorderList():Observable<any>{
  return this.http.get(this.url+"/api/orders");
}

placeOrderItem(cid:any, body:any):Observable<any>{
  return this.http.post(this.url + "/api/orders/addOrder/"+cid, body);
}

addPaymentOfOrder(amount: any):Observable<any> {
  return this.http.get(this.url + "/api/orders/createTransaction/"+amount);
}

  storeUserRole(role: string): void {
    localStorage.setItem("role", role);
  }

  getUserRole(): any {
    const role = localStorage.getItem("role");
    return role;
  }
}


