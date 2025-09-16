import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { SpinnerComponentComponent } from '../../../../shared/components/spinner-component/spinner-component.component';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-add',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, materialModules, CommonModule, SpinnerComponentComponent],
  templateUrl: './person-add.component.html',
  styleUrl: './person-add.component.scss',
})
export class PersonAddComponent implements OnInit {
  formGroup?: FormGroup;

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  private readonly router = inject(Router);

  private readonly personService = inject(PersonService);

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^([A-Za-zÀ-ú]+[A-Za-zÀ-ú ])*$')]],
      age: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('\\d+')]],
      cpf: [
        '',
        [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')],
      ],
    });
  }

  onSubmit(): void {
    if (this.formGroup) {
      this.personService.create(this.formGroup.value).subscribe({
        next: (response: Person) => {
          console.log(response);
          this.formGroup?.reset();
          this.formGroup?.markAsUntouched();
          this.formGroup?.markAsPristine();
          this.router.navigate(['/person-home/person']);
        },
      });
    }
  }
}
