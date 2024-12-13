import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSignupComponent } from './customer-signup.component';

describe('CustomerSignupComponent', () => {
  let component: CustomerSignupComponent;
  let fixture: ComponentFixture<CustomerSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerSignupComponent]
    });
    fixture = TestBed.createComponent(CustomerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
