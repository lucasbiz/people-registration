import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-row',
  imports: [CommonModule],
  templateUrl: './user-row.component.html',
  styleUrl: './user-row.component.css'
})
export class UserRowComponent {

  @Input() user!: User;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.user.id);
  }

  onDelete() {
    this.delete.emit(this.user.id);
  }

}
