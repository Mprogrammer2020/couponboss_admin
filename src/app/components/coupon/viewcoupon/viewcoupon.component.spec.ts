import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcouponComponent } from './viewcoupon.component';

describe('ViewcouponComponent', () => {
  let component: ViewcouponComponent;
  let fixture: ComponentFixture<ViewcouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
