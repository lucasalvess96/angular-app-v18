import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { RouterOutlet } from '@angular/router';
import { getPortuguesePaginatorIntl } from './shared/constants/portuguesePaginatorIntl';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  providers: [{ provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-app-v18 🚀';
}
