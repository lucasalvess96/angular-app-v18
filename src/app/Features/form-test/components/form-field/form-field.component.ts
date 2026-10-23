import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { DynamicField } from '../../models/dynamicField';
import { FieldType } from '../../models/fieldType';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [materialModules, CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent implements OnInit {
  formGroup!: FormGroup;

  fieldType = FieldType;

  placeHolder?: string;

  @Input() fields: DynamicField[] = [];

  @Output() save = new EventEmitter<any>();
  private readonly formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(this.buildGroup(this.fields));
  }

  private buildGroup(fields: DynamicField[]): any {
    const group: any = {};
    fields.forEach((field) => {
      if (field.type === FieldType.Group) {
        group[field.name] = this.formBuilder.group(this.buildGroup(field.children || []));
      } else if (field.type === FieldType.Array) {
        group[field.name] = this.formBuilder.array([]);
      } else {
        group[field.name] = ['', field.validators || []];
      }
    });
    return group;
  }

  getFormArray(name: string): FormArray {
    return this.formGroup.get(name) as FormArray;
  }

  addItem(field: DynamicField): void {
    const arr = this.getFormArray(field.name);
    arr.push(this.formBuilder.group(this.buildGroup(field.children || [])));
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.save.emit(this.formGroup.value);
    }
  }

  getErrorMessage(field: DynamicField): string | null {
    const control = this.formGroup.get(field.name);
    if (!control?.touched || !control?.errors) return null;

    const errors = control.errors;
    const messages = field.errorMessages || {};

    if (errors['required']) return messages.required || 'Campo obrigatório';
    if (errors['minlength']) return messages.minlength || 'Tamanho mínimo inválido';
    if (errors['maxlength']) return messages.maxlength || 'Tamanho máximo inválido';
    if (errors['pattern']) return messages.pattern || 'Formato inválido';

    return 'Campo inválido';
  }
}
