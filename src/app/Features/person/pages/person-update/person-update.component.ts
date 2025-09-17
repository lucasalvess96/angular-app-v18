import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { FormComponentComponent } from '../../../../shared/components/form-component/form-component.component';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-update',
  standalone: true,
  imports: [materialModules, CommonModule, FormComponentComponent],
  templateUrl: './person-update.component.html',
  styleUrl: './person-update.component.scss',
})
export class PersonUpdateComponent implements OnInit {
  person?: Person;

  formGroup?: FormGroup;

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly personService = inject(PersonService);
  private readonly toastService = inject(ToastrService);

  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.searchIdPerson();
  }

  searchIdPerson(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.personService.detail(+id).subscribe((person: Person) => (this.person = person));
  }

  update(person: Person): void {
    this.personService.update(person).subscribe(() => {
      this.toastService.success('Cadastro atualizado com sucesso!');
      this.router.navigate(['/person-home/person']);
    });
  }

  openDialogConfirm(person: Person): void {
    this.dialog
      .open(DialogConfirmComponent, {
        width: '30vw',
        disableClose: true,
        data: { title: 'Atualizar Formulário', message: 'Confirmar alterações' },
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.update(person);
        }
      });
  }
}
