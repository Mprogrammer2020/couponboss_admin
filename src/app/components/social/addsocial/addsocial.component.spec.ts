import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsocialComponent } from './addsocial.component';

describe('AddsocialComponent', () => {
  let component: AddsocialComponent;
  let fixture: ComponentFixture<AddsocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
