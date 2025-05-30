import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { materialModules } from '../../../../shared/angular-material/material-modules';

@Component({
  selector: 'app-interpolation',
  standalone: true,
  imports: [materialModules, NgIf],
  templateUrl: './interpolation.component.html',
  styleUrl: './interpolation.component.scss',
})
export class InterpolationComponent {
  name = signal('John Doe');
  message = 'your name';
  photo =
    'https://plus.unsplash.com/premium_photo-1677362425101-a11ef7eaae03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D';
  expression = '#FFF0807';
  navStyle = 'font-size: 1.2rem; color: cornflowerblue;';
  linkStyle = 'underline';
  activeLinkStyle = 'overline';
  buttonClicked = false;

  handlerAlert(): void {
    window.alert('Event binding');
  }

  logValue(valueMessage: string): void {
    window.alert(`${valueMessage}`);
  }

  onButtonClick(): void {
    this.buttonClicked = true;
  }
}
