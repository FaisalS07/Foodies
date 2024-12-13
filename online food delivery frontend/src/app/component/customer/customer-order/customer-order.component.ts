import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Order } from '../../model/order.model';
import { FoodstoreService } from 'src/app/foodstore.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CustomerHistoryComponent } from '../customer-history/customer-history.component';
declare var Razorpay: any;

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css']
})
export class CustomerOrderComponent implements OnInit{

  orderList: Order[]=[];
  selectedOrder: Order | undefined;
  customer: any = {};
  constructor(
    private foodservice: FoodstoreService,
    private router: Router,
    private datePipe : DatePipe,
    private dialog:MatDialog,
    private ngZone: NgZone
  ) { 
    this.foodservice.isCustomerLoginPresent();
  }

  ngOnInit(): void {
    this.getCustomerDetail();
    this.getOrderList();
  }

  getCustomerDetail(): void {
    const cid = this.foodservice.getCustomerAuthorization();
    this.foodservice.getCustomerById(cid).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("Customer*****", res);
        if (!!res && res?.customerId) {
          this.customer = res;
        }
      }, err => {
        console.log("Err");
      }
    )
  }


  getOrderList():void{
    this.foodservice.orderList(this.foodservice.getCustomerAuthorization()).pipe(take(1)).subscribe(
      (res: any) => {
       
        if(!!res && Array.isArray(res)){
          this.orderList=res;
          console.log("length#######",this.orderList.length);
        }
      }, err => {
        console.log("Error");
      }
    )
  }
  getDate(d:string|undefined):any{
    let ans :any;
    console.log("DDDDDD",d);
    if(!!d && d!== null){
      ans=this.datePipe.transform(d,"shortDate")||null;
      console.log("@@@@@@@@",ans);
    }
    return ans;
  }
  
  addPayment(order: Order): void {
    this.foodservice.addPaymentOfOrder(order?.totalPrice).pipe(take(1)).subscribe((res: any) => {
      console.log('>>>>', res);
      if (res && res?.orderId) {
        this.openTransactioModal(res);
        this.selectedOrder = order;
      }
    }, error => {
      console.log("Error => ", error);
    })
  }

  openHistory(order: Order): void {
    console.log('>>>>>>>', order);
    const dialogRef = this.dialog.open(CustomerHistoryComponent, {
      data: order,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '80%',
      width: '80%'
      
    });
  }

  openTransactioModal(response: any) {
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'online food shop',
      description: 'Payment of online food shop',
      image: 'https://cdn.pixabay.com/photo/2023/01/22/13/46/swans-7736415_640.jpg',
      handler: (response: any) => {
        console.log('####', response);
        if(response!= null && response.razorpay_payment_id != null) {
          this.processResponse(response);
        } else {
          alert("Payment failed..")
        }
       
      },
      prefill : {
        name:'LPY',
        email: 'LPY@GMAIL.COM',
        contact: '9004380734'
      },
      notes: {
        address: 'Online food shop'
      },
      theme: {
        color: '#F37254'
      }
    };

    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  processResponse(resp: any) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>',resp);
    if (resp && resp?.razorpay_order_id && resp?.razorpay_payment_id && this.selectedOrder) {
      const body: any = {
        totalPrice: this.selectedOrder?.totalPrice,
        orderId: this.selectedOrder?.orderId,
       
        PaidDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd')?.toString(),
        paidAmount: this.selectedOrder?.totalPrice,
        customer: this.customer
  
  
      };
      console.log("$$$$$$$", body);
      this.foodservice.addPayment(body, this.selectedOrder?.orderId, this.customer?.customerId).pipe(take(1)).subscribe(
        (res: any) => {
          console.log("*********", res);
          if (res && res?.paymentId) {
            alert("Payment done sucessfully");
            this.ngZone.run(() => {
              this.getOrderList();
            });
            
          }
        }, err => {
          console.log("error");
        }
      )
    }
  }
}