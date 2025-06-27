import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { materialModules } from '../../../../shared/angular-material/material-modules';

@Component({
  selector: 'app-restaurante-create',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, materialModules, CommonModule, ReactiveFormsModule],
  templateUrl: './restaurante-create.component.html',
  styleUrl: './restaurante-create.component.scss',
})
export class RestauranteCreateComponent implements OnInit {
  formGroup!: FormGroup;

  private readonly formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.pattern('^[A-Za-zÀ-ú]+(?: [A-Za-zÀ-ú]+)*$')]],
      taxaEntrega: ['', Validators.required],
      disponivelParaEntrega: ['', Validators.required],
      cozinha: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log('Form submitted:', this.formGroup.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
