import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-component-interaction',
  standalone: true,
  imports: [],
  templateUrl: './component-interaction.component.html',
  styleUrl: './component-interaction.component.scss',
})
export class ComponentInteractionComponent {
  @Input({ required: true }) information = '';

  @Output() alertMessage = new EventEmitter<string>();

  submitEvent(): void {
    this.alertMessage.emit('button clicked');
  }
}
