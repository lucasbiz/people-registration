import { Component } from '@angular/core';
import { InputButtonComponent } from '../input-button/input-button.component';
import { UserListComponent } from '../user-list/user-list.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RegisterModalComponent } from '../../modals/register-modal/register-modal.component';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-people-registration',
  imports: [InputButtonComponent, UserListComponent],
  templateUrl: './people-registration.component.html',
  styleUrl: './people-registration.component.css'
})
export class PeopleRegistrationComponent {

  @ViewChild(UserListComponent) userListComponent!: UserListComponent;

  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  newRegister():void {
    const initialState = {
      modalTitle: 'Criar novo cadastro',
      saveButtonText: 'Novo cadastro'
    };

    this.bsModalRef = this.modalService.show(RegisterModalComponent, {
      initialState,
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.renderUsersCall.subscribe(() => {
      this.userListComponent.renderUsers();
    });

  }
}

