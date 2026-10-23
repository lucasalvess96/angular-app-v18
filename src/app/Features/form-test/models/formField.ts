import { Validators } from '@angular/forms';
import { DynamicField } from './dynamicField';
import { FieldType } from './fieldType';

//OBS: serve somente para mostrar os campos em tela
export const personFields: DynamicField[] = [
  {
    name: 'name',
    label: 'Nome',
    type: FieldType.Text,
    placeholder: 'John Doe',
    validators: [Validators.required, Validators.pattern('^([A-Za-zÀ-ú]+[A-Za-zÀ-ú ])*$')],
    errorMessages: {
      required: 'Campo obrigatório',
      minlength: 'Informe no mínimo 2 dígitos',
      pattern: 'O campo só permite letras',
    },
    transform: 'lowercase',
  },
  {
    name: 'age',
    label: 'Idade',
    type: FieldType.Number,
    placeholder: '18',
    mask: '00',
    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern(/^\d+$/)],
  },
  {
    name: 'cpf',
    label: 'CPF/CNPJ',
    type: FieldType.Text,
    placeholder: '000.000.000-00',
    mask: '000.000.000-00 || 00.000.000/0000-00',
    validators: [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(14),
      Validators.pattern('^[0-9]+$'),
    ],
  },
  {
    name: 'addrres',
    label: 'Endereço',
    type: FieldType.Group,
    children: [
      { name: 'city', label: 'Cidade', type: FieldType.Text },
      { name: 'street', label: 'Rua', type: FieldType.Text },
      { name: 'number', label: 'Número', type: FieldType.Number },
      {
        name: 'uf',
        label: 'UF',
        type: FieldType.Group,
        children: [{ name: 'sigle', label: 'Sigla', type: FieldType.Text }],
      },
    ],
  },
  {
    name: 'contact',
    label: 'Contato',
    type: FieldType.Group,
    children: [
      { name: 'phone', label: 'Telefone', type: FieldType.Text },
      { name: 'email', label: 'E-mail', type: FieldType.Text },
      { name: 'phone2', label: 'Telefone2', type: FieldType.Text },
      { name: 'email2', label: 'E-mail2', type: FieldType.Text },
      { name: 'phone3', label: 'Telefone3', type: FieldType.Text },
      { name: 'email3', label: 'E-mail3', type: FieldType.Text },
    ],
  },
];
