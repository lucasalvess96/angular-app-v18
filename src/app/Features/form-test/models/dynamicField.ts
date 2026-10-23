import { ValidatorFn } from '@angular/forms';
import { FieldType } from './fieldType';

export interface DynamicField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  mask?: string;
  validators?: ValidatorFn[];
  children?: DynamicField[]; // para grupos
  errorMessages?: {
    required?: string;
    minlength?: string;
    maxlength?: string;
    pattern?: string;
  };
  transform?: 'lowercase' | 'uppercase';
}
