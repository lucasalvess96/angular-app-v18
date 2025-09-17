import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { FormComponentComponent } from '../../../../shared/components/form-component/form-component.component';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-add',
  standalone: true,
  imports: [materialModules, CommonModule, FormComponentComponent],
  templateUrl: './person-add.component.html',
  styleUrl: './person-add.component.scss',
})
export class PersonAddComponent {
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
