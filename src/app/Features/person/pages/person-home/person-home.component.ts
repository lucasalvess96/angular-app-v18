import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { materialModules } from '../../../../shared/angular-material/material-modules';

@Component({
  selector: 'app-person-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, materialModules, CommonModule],
  templateUrl: './person-home.component.html',
  styleUrl: './person-home.component.scss',
})
export class PersonHomeComponent {}
