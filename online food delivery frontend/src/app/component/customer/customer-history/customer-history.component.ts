import { Component ,Inject } from '@angular/core';
import { Order } from '../../model/order.model';
import { Food } from '../../model/food.model';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-history',
  templateUrl: './customer-history.component.html',
  styleUrls: ['./customer-history.component.css']
})
export class CustomerHistoryComponent  {

  order: Order | undefined;
  food: Array<Food> = [];
  constructor(
    //In constructor argument pass component class name i.e OrderHistoryDialogComponent
    public dialogRef: MatDialogRef<CustomerHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    console.log('>>>', data);
    if (!!data && data?.orderId) {
      this.order = data;
      if (this.order?.food && this.order?.food.length > 0) {
        this.food = this.order?.food;
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}


