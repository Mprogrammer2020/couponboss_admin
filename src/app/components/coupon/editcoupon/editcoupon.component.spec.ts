import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcouponComponent } from './editcoupon.component';

describe('EditcouponComponent', () => {
  let component: EditcouponComponent;
  let fixture: ComponentFixture<EditcouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
