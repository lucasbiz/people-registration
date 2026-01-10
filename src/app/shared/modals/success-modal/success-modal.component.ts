import { Component, inject, input } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-success-modal',
  imports: [ButtonModule],
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.css',
})
export class SuccessModalComponent {
  modalTitle = input.required<string>();

  private readonly dynamicDialogRef = inject(DynamicDialogRef);

  closeModal(): void {
    this.dynamicDialogRef.close();
  }
}
