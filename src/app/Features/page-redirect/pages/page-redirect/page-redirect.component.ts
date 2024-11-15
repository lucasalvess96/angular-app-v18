import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-page-redirect',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './page-redirect.component.html',
  styleUrl: './page-redirect.component.scss',
})
export class PageRedirectComponent {}
