import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListoffoodComponent } from './admin-listoffood.component';

describe('AdminListoffoodComponent', () => {
  let component: AdminListoffoodComponent;
  let fixture: ComponentFixture<AdminListoffoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminListoffoodComponent]
    });
    fixture = TestBed.createComponent(AdminListoffoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
