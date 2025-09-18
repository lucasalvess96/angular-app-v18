import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPaginationComponent } from './person-pagination.component';

describe('PersonPaginationComponent', () => {
  let component: PersonPaginationComponent;
  let fixture: ComponentFixture<PersonPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
