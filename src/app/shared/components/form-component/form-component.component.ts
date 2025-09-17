import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { Person } from '../../../features/person/models/person';
import { materialModules } from '../../angular-material/material-modules';

@Component({
  selector: 'app-form-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, materialModules, CommonModule, NgxMaskDirective],
  templateUrl: './form-component.component.html',
  styleUrl: './form-component.component.scss',
})
export class FormComponentComponent implements OnInit, OnChanges {
  @Input() update?: Person;

  @Output() save = new EventEmitter<Person>();

  formGroup!: FormGroup;

  private readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^([A-Za-zÀ-ú]+[A-Za-zÀ-ú ])*$')]],
      age: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('\\d+')]],
      cpf: [
        '',
        [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')],
      ],
    });
  }

  ngOnChanges(): void {
    if (this.update && this.formGroup) {
      this.formGroup.patchValue(this.update);
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const value: Person = { ...this.update, ...this.formGroup.value };
      this.save.emit(value);
    }
  }
}
