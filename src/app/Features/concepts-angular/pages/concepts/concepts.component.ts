import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-concepts',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './concepts.component.html',
  styleUrl: './concepts.component.scss',
})
export class ConceptsComponent {}
