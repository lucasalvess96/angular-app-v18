import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { materialModules } from '../../angular-material/material-modules';

@Component({
  selector: 'app-spinner-component',
  standalone: true,
  imports: [CommonModule, materialModules],
  templateUrl: './spinner-component.component.html',
  styleUrl: './spinner-component.component.scss',
})
export class SpinnerComponentComponent {
  @Input() loading?: boolean;
  @Input() message?: string;
  @Input() diameter: number = 120;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value: number = 50;
}
