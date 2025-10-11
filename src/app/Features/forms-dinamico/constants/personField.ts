import { Validators } from '@angular/forms';
import { DynamicField } from '../models/dynamicField';

export const PERSON_FIELDS: DynamicField[] = [
  {
    name: 'name',
    label: 'Nome',
    type: 'text',
    placeholder: 'John Doe two',
    validators: [Validators.required, Validators.pattern(/^[A-Za-zÀ-ú\s]+$/)],
  },
  {
    name: 'cpf',
    label: 'CPF',
    type: 'cpf',
    placeholder: '000.000.000-00',
    mask: '000.000.000-00',
    validators: [Validators.required, Validators.pattern(/^\d{11}$/)],
  },
  {
    name: 'age',
    label: 'Idade',
    type: 'number',
    placeholder: '18',
    mask: '00',
    validators: [Validators.required, Validators.minLength(2)],
  },
];
