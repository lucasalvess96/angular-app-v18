import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDinamicTestComponent } from './form-dinamic-test.component';

describe('FormDinamicTestComponent', () => {
  let component: FormDinamicTestComponent;
  let fixture: ComponentFixture<FormDinamicTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDinamicTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDinamicTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
