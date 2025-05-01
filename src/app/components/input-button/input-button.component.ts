import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-input-button',
  imports: [CommonModule],
  templateUrl: './input-button.component.html',
  styleUrl: './input-button.component.css'
})
export class InputButtonComponent {

  @Input() value: string = '';
  @Input() isHomePage: boolean = false;
  
}
