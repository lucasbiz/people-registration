import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirm-deletion-modal',
  imports: [ButtonModule],
  templateUrl: './confirm-deletion-modal.component.html',
})
export class ConfirmDeletionModalComponent {
  private readonly dynamicDialogRef = inject(DynamicDialogRef);

  confirmDeletion(deleteUser: boolean): void {
    this.dynamicDialogRef.close(deleteUser);
  }
}
