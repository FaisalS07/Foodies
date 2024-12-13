import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHistoryComponent } from './customer-history.component';

describe('CustomerHistoryComponent', () => {
  let component: CustomerHistoryComponent;
  let fixture: ComponentFixture<CustomerHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerHistoryComponent]
    });
    fixture = TestBed.createComponent(CustomerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
