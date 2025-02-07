import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ComponentInteractionComponent } from '../../components/component-interaction/component-interaction.component';
import { InterpolationComponent } from '../../components/interpolation/interpolation.component';

@Component({
  selector: 'app-concepts',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, InterpolationComponent, ComponentInteractionComponent],
  templateUrl: './concepts.component.html',
  styleUrl: './concepts.component.scss',
})
export class ConceptsComponent {
  information = 'component-interaction works!';

  messageEventOutPut = 'Loading message';

  onButtonClicked(message: string): void {
    this.messageEventOutPut = message;
  }
}
