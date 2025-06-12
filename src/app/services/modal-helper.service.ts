import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root'
})


export class ModalHelperService {

  dialogRef: DynamicDialogRef | undefined;

  constructor (private dialogService: DialogService){};

  newRegister():void {
    this.dialogRef = this.dialogService.open(RegisterModalComponent, {
      data: {
        modalTitle: 'Criar novo cadastro',
      },
      width: '50vw',
      modal:true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
    });

    this.dialogRef.onClose.subscribe(() => {
      this.usersService.getUsers();
    });
  }

  editRegister(): void {
    this.dialogRef = this.dialogService.open(RegisterModalComponent, {
      data: {
        modalTitle: 'Editar ',
      },
      width: '50vw',
      modal:true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
    });

    this.dialogRef.onClose.subscribe(() => {
      this.usersService.getUsers();
    });
  }


}
