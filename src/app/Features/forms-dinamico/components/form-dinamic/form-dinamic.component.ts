import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { DynamicField } from '../../models/dynamicField';

@Component({
  selector: 'app-form-dinamic',
  standalone: true,
  imports: [materialModules, CommonModule, NgxMaskDirective],
  templateUrl: './form-dinamic.component.html',
  styleUrl: './form-dinamic.component.scss',
})
export class FormDinamicComponent implements OnInit {
  @Input() fields: DynamicField[] = [];
  @Input() formGroup!: FormGroup;
  @Input() showActions = true;

  @Output() save = new EventEmitter<any>();
  @Output() formReady = new EventEmitter<FormGroup>();

  private readonly formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = this.formBuilder.group(this.buildFormGroup(this.fields));
    }
    this.formReady.emit(this.formGroup);
  }

  private buildFormGroup(fields: DynamicField[]): { [key: string]: any } {
    const group: { [key: string]: any } = {};

    fields.forEach((field) => {
      if (field.children && field.children.length > 0) {
        group[field.name] = this.formBuilder.group(this.buildFormGroup(field.children));
      } else {
        group[field.name] = ['', field.validators || []];
      }
    });

    return group;
  }

  getNestedFormGroup(name: string): FormGroup {
    return this.formGroup.get(name) as FormGroup;
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.save.emit(this.formGroup.value);
    }
  }
}
