import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { Restaurante } from '../../models/restaurante';
import { RestauranteService } from '../../services/restaurante.service';

@Component({
  selector: 'app-restaurante-create',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, materialModules, CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './restaurante-create.component.html',
  styleUrl: './restaurante-create.component.scss',
})
export class RestauranteCreateComponent implements OnInit {
  formGroup!: FormGroup;

  private readonly formBuilder = inject(FormBuilder);

  private readonly restauranteService = inject(RestauranteService);

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.pattern('^[A-Za-zÀ-ú]+(?: [A-Za-zÀ-ú]+)*$')]],
      taxaEntrega: ['', Validators.required],
      disponivelParaEntrega: ['', Validators.required],
      cozinha: this.formBuilder.group({
        id: ['', Validators.required],
      }),
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log('Form submitted:', this.formGroup.value);
      this.restauranteService.create(this.formGroup.value).subscribe({
        next: (response: Restaurante) => {
          console.log('Restaurante created successfully:', response);
          // this.formGroup.reset();
        },
        error: (error: any) => {
          console.error('Error creating restaurante:', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  blockNonNumeric(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
    if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}
