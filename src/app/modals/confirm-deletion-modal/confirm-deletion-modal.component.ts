import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirm-deletion-modal',
  imports: [ButtonModule],
  templateUrl: './confirm-deletion-modal.component.html',
  styleUrl: './confirm-deletion-modal.component.css',
})
export class ConfirmDeletionModalComponent {
  @Output() userDeleted = new EventEmitter<void>();

  constructor(private dynamicDialogRef: DynamicDialogRef) {}

  confirmDeletion(deleteUser: boolean): void {
    this.dynamicDialogRef.close(deleteUser);
  }
}
