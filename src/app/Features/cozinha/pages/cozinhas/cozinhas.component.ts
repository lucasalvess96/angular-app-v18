import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-cozinhas',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './cozinhas.component.html',
  styleUrl: './cozinhas.component.scss',
})
export class CozinhasComponent {}
