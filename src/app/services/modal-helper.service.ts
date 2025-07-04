import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegisterModalComponent } from '../modals/register-modal/register-modal.component';
import { User } from '../models/user.model';
import { ConfirmDeletionModalComponent } from '../modals/confirm-deletion-modal/confirm-deletion-modal.component';
import { Observable } from 'rxjs';
import { SuccessModalComponent } from '../modals/success-modal/success-modal.component';

@Injectable({
  providedIn: 'root'
})


export class ModalHelperService {

  dialogRef: DynamicDialogRef | undefined;

  constructor (
    private dialogService: DialogService,
 ){};

 private openModal<T>(component: any, config?: DynamicDialogConfig): DynamicDialogRef<T>{

  const defaultConfig: DynamicDialogConfig = {       
      width: '50vw',
      modal:true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
    };
    return this.dialogService.open(component, {...defaultConfig, ...config});
  }

  registerOrEdit(dialogTitle: string, userData?: User): Observable<boolean> {

    this.dialogRef = this.openModal(RegisterModalComponent,
      {inputValues: {
        modalTitle: dialogTitle,
        formInputs: userData,
        saveButtonText: dialogTitle
      }}
    );

    return this.dialogRef.onClose as Observable<boolean>;
  }

  confirmDeletion(): Observable<boolean> {

    this.dialogRef = this.openModal(ConfirmDeletionModalComponent);

    return this.dialogRef.onClose as Observable<boolean>;
  };

  showSuccessMessage(dialogTitle: string): void {
    
    this.dialogRef = this.openModal(SuccessModalComponent, {
      inputValues: {
        modalTitle: dialogTitle
      }});
  };

}
