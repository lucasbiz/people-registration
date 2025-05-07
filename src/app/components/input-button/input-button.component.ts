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
  @Input() isHomePage: boolean = false;
  @Output() clicked = new EventEmitter<void>();

  onClick(){
    console.log("botao clicado");
    this.clicked.emit();
  }

}
