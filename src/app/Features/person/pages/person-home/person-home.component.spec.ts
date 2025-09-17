import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonHomeComponent } from './person-home.component';

describe('PersonHomeComponent', () => {
  let component: PersonHomeComponent;
  let fixture: ComponentFixture<PersonHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
