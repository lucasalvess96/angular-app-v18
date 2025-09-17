import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSignalComponent } from './person-signal.component';

describe('PersonSignalComponent', () => {
  let component: PersonSignalComponent;
  let fixture: ComponentFixture<PersonSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonSignalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
