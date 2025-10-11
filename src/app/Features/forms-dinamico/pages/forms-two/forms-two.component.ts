import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { DialogConfirmComponent } from '../../../person/components/dialog-confirm/dialog-confirm.component';
import { Person } from '../../../person/models/person';
import { PersonService } from '../../../person/services/person.service';
import { FormDinamicComponent } from '../../components/form-dinamic/form-dinamic.component';
import { PERSON_FIELDS } from '../../constants/personField';
import { DynamicField } from '../../models/dynamicField';

@Component({
  selector: 'app-forms-two',
  standalone: true,
  imports: [materialModules, CommonModule, FormDinamicComponent],
  templateUrl: './forms-two.component.html',
  styleUrl: './forms-two.component.scss',
})
export class FormsTwoComponent {
  personFields: DynamicField[] = PERSON_FIELDS;

  private readonly router = inject(Router);
  private readonly personService = inject(PersonService);
  private readonly toastService = inject(ToastrService);
  private readonly dialog = inject(MatDialog);

  create(person: Person): void {
    this.personService.create(person).subscribe(() => {
      this.toastService.success('Cadastro realizado com sucesso!');
      this.router.navigate(['/person-home/person']);
    });
  }

  openDialogConfirm(person: Person): void {
    this.dialog
      .open(DialogConfirmComponent, {
        width: '30vw',
        disableClose: true,
        data: { title: 'Salvar Formulário', message: 'Salvar' },
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.create(person);
        }
      });
  }
}
