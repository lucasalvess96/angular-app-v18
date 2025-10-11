import { Validators } from '@angular/forms';
import { DynamicField } from '../models/dynamicField';

export const PERSON_FIELDS_ADDRESS: DynamicField[] = [
  {
    name: 'name',
    label: 'Nome',
    type: 'text',
    placeholder: 'person address',
    validators: [Validators.required],
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
    name: 'addressDto',
    label: 'Endereço',
    type: 'group',
    children: [
      {
        name: 'street',
        label: 'Rua',
        type: 'text',
        validators: [Validators.required],
      },
      {
        name: 'number',
        label: 'Número',
        type: 'number',
        validators: [Validators.required],
      },
      {
        name: 'city',
        label: 'Cidade',
        type: 'text',
        validators: [Validators.required],
      },
    ],
  },
];
