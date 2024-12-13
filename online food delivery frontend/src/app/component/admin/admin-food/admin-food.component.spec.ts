import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFoodComponent } from './admin-food.component';

describe('AdminFoodComponent', () => {
  let component: AdminFoodComponent;
  let fixture: ComponentFixture<AdminFoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFoodComponent]
    });
    fixture = TestBed.createComponent(AdminFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
