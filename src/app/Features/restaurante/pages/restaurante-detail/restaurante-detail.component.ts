import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { materialModules } from '../../../../shared/angular-material/material-modules';

@Component({
  selector: 'app-restaurante-detail',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, materialModules, CommonModule, ReactiveFormsModule],
  templateUrl: './restaurante-detail.component.html',
  styleUrl: './restaurante-detail.component.scss',
})
export class RestauranteDetailComponent {}
