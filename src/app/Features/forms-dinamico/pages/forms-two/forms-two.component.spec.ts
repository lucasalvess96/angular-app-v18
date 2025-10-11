import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsTwoComponent } from './forms-two.component';

describe('FormsTwoComponent', () => {
  let component: FormsTwoComponent;
  let fixture: ComponentFixture<FormsTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
