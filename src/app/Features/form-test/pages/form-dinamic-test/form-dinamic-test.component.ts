import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { DynamicField } from '../../models/dynamicField';
import { personFields } from '../../models/formField';

@Component({
  selector: 'app-form-dinamic-test',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, materialModules, CommonModule, ReactiveFormsModule, FormFieldComponent],
  templateUrl: './form-dinamic-test.component.html',
  styleUrl: './form-dinamic-test.component.scss',
})
export class FormDinamicTestComponent {
  formFields: DynamicField[] = personFields;

  submitForm(value: DynamicField): void {
    value.name = this.formatLowerCase(value.name);
    console.log(value);
  }

  formatLowerCase(value: string): string {
    return value.toLocaleLowerCase().trim();
  }
}
