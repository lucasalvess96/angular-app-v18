import { ValidatorFn } from '@angular/forms';

export interface DynamicField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'cpf' | 'email' | 'date' | 'textarea' | 'group'; // você pode expandir
  placeholder?: string;
  mask?: string;
  validators?: ValidatorFn[];
  children?: DynamicField[];
}
