import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHomeComponent } from './customer-home.component';

describe('CustomerHomeComponent', () => {
  let component: CustomerHomeComponent;
  let fixture: ComponentFixture<CustomerHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerHomeComponent]
    });
    fixture = TestBed.createComponent(CustomerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
