import { Component } from '@angular/core';
import { InputButtonComponent } from '../input-button/input-button.component';
import { UserListComponent } from '../user-list/user-list.component';
import { RegisterModalComponent } from '../../modals/register-modal/register-modal.component';
import { ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsersService } from '../../services/user.service';


@Component({
  selector: 'app-people-registration',
  imports: [InputButtonComponent, UserListComponent],
  providers: [DialogService],
  templateUrl: './people-registration.component.html',
  styleUrl: './people-registration.component.css'
})
export class PeopleRegistrationComponent {

  @ViewChild(UserListComponent) userListComponent!: UserListComponent;

  dialogRef: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService, private usersService: UsersService) {}

  newRegister():void {

    this.dialogRef = this.dialogService.open(RegisterModalComponent, {
      data: {
        modalTitle: 'Criar novo cadastro',
        saveButtonText: 'Novo cadastro',
        userData: null
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

