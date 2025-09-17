import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { materialModules } from '../../../../shared/angular-material/material-modules';

@Component({
  selector: 'app-person-signal',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, materialModules, CommonModule],
  templateUrl: './person-signal.component.html',
  styleUrl: './person-signal.component.scss',
})
export class PersonSignalComponent {}
