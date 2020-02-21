import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsocialComponent } from './editsocial.component';

describe('EditsocialComponent', () => {
  let component: EditsocialComponent;
  let fixture: ComponentFixture<EditsocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
