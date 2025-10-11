import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { FormDinamicComponent } from '../../components/form-dinamic/form-dinamic.component';
import { PERSON_FIELDS_ADDRESS } from '../../constants/personAddressField';
import { DynamicField } from '../../models/dynamicField';
import { FormsService } from '../../services/forms.service';

@Component({
  selector: 'app-forms-one',
  standalone: true,
  imports: [materialModules, CommonModule, FormDinamicComponent],
  templateUrl: './forms-one.component.html',
  styleUrl: './forms-one.component.scss',
})
export class FormsOneComponent {
  personFieldAddress: DynamicField[] = PERSON_FIELDS_ADDRESS;

  formGroup!: FormGroup;

  private readonly formsService = inject(FormsService);

  private readonly toastrService = inject(ToastrService);

  private readonly router = inject(Router);

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.formsService.create(this.formGroup.value).subscribe(() => {
        this.toastrService.success('Formulário enviado com sucesso!', 'Sucesso');
        this.router.navigate(['/person-home/person']);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
