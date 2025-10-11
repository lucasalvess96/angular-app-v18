import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDinamicComponent } from './form-dinamic.component';

describe('FormDinamicComponent', () => {
  let component: FormDinamicComponent;
  let fixture: ComponentFixture<FormDinamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDinamicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDinamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
