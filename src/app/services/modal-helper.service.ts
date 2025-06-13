import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegisterModalComponent } from '../modals/register-modal/register-modal.component';
import { User } from '../models/user.model';
import { ConfirmDeletionModalComponent } from '../modals/confirm-deletion-modal/confirm-deletion-modal.component';

@Injectable({
  providedIn: 'root'
})


export class ModalHelperService {

  dialogRef: DynamicDialogRef | undefined;

  constructor (
    private dialogService: DialogService,
 ){};

  registerOrEdit(dialogTitle: string, userData?: User): void {

    this.dialogRef = this.dialogService.open(RegisterModalComponent, {
      inputValues: {
        modalTitle: dialogTitle,
        formInputs: userData
      },
      
      width: '50vw',
      modal:true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
    });
  }

  confirmDeletion(): void {

    this.dialogRef = this.dialogService.open(ConfirmDeletionModalComponent, {       
      width: '50vw',
      modal:true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
    });
  }

  
}
