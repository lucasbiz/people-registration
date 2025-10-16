import { Injectable, Type, inject } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { RegisterModalComponent } from '../modules/user-management/modals/register-modal/register-modal.component';
import { User } from '../shared/models/user.model';
import { ConfirmDeletionModalComponent } from '../modules/user-management/modals/confirm-deletion-modal/confirm-deletion-modal.component';
import { Observable } from 'rxjs';
import { SuccessModalComponent } from '../shared/modals/success-modal/success-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalHelperService {
  dialogRef: DynamicDialogRef | undefined;
  private readonly dialogService: DialogService = inject(DialogService);

  private openModal<T>(
    component: Type<T>,
    config?: DynamicDialogConfig,
  ): DynamicDialogRef<T> {
    const defaultConfig: DynamicDialogConfig = {
      width: '40vw',
      modal: true,
      breakpoints: {
        '960px': '60vw',
        '640px': '80vw',
      },
    };
    return this.dialogService.open(component, { ...defaultConfig, ...config });
  }

  registerOrEdit(dialogTitle: string, userData?: User): Observable<boolean> {
    this.dialogRef = this.openModal(RegisterModalComponent, {
      inputValues: {
        modalTitle: dialogTitle,
        formInputs: userData,
        saveButtonText: dialogTitle,
      },
    });

    return this.dialogRef.onClose as Observable<boolean>;
  }

  confirmDeletion(): Observable<boolean> {
    this.dialogRef = this.openModal(ConfirmDeletionModalComponent);

    return this.dialogRef.onClose as Observable<boolean>;
  }

  showSuccessMessage(dialogTitle: string): void {
    this.dialogRef = this.openModal(SuccessModalComponent, {
      inputValues: {
        modalTitle: dialogTitle,
      },
    });
  }
}
