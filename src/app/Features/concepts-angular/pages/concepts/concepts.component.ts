import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InterpolationComponent } from '../../components/interpolation/interpolation.component';

@Component({
  selector: 'app-concepts',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, InterpolationComponent],
  templateUrl: './concepts.component.html',
  styleUrl: './concepts.component.scss',
})
export class ConceptsComponent {}
