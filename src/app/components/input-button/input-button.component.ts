import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-input-button',
  imports: [CommonModule, ButtonModule],
  templateUrl: './input-button.component.html',
  styleUrl: './input-button.component.css'
})
export class InputButtonComponent {

  @Input() value: string = '';
  @Output() clicked = new EventEmitter<void>();


  onClick(): void{
    this.clicked.emit();
  }

}
