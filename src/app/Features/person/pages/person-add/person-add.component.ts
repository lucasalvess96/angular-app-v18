import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-add',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, materialModules, CommonModule, NgxMaskDirective],
  templateUrl: './person-add.component.html',
  styleUrl: './person-add.component.scss',
})
export class PersonAddComponent implements OnInit {
  formGroup?: FormGroup;

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  private readonly router = inject(Router);

  private readonly personService = inject(PersonService);
  private readonly toastService = inject(ToastrService);

  private readonly dialog = inject(MatDialog);

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
        next: () => {
          this.toastService.success('Cadastro realizado com sucesso!');
          this.formGroup?.reset();
          this.formGroup?.markAsUntouched();
          this.formGroup?.markAsPristine();
          this.router.navigate(['/person-home/person']);
        },
      });
    }
  }

  openDialogConfirm(): void {
    this.dialog
      .open(DialogConfirmComponent, {
        width: '30vw',
        disableClose: true,
        data: { formGroup: this.formGroup },
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.onSubmit();
        }
      });
  }
}
