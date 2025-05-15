import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-input-button',
  imports: [CommonModule],
  templateUrl: './input-button.component.html',
  styleUrl: './input-button.component.css'
})
export class InputButtonComponent {

  @Input() value: string = '';
  @Output() clicked = new EventEmitter<void>();


  onClick(){
    this.clicked.emit();
  }

}
