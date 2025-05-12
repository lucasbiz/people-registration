import { Component } from '@angular/core';
import { InputButtonComponent } from '../input-button/input-button.component';
import { UserListComponent } from '../user-list/user-list.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { UsersService } from '../../services/user.service';
import { User, UsersData } from '../../models/user.model';

@Component({
  selector: 'app-people-registration',
  imports: [InputButtonComponent, UserListComponent],
  templateUrl: './people-registration.component.html',
  styleUrl: './people-registration.component.css'
})
export class PeopleRegistrationComponent {

  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private usersService: UsersService) {}

  newRegister() {
    const initialState = {
      modalTitle: 'Criar novo cadastro',
      saveButtonText: 'Novo cadastro'
    }

    this.bsModalRef = this.modalService.show(RegisterModalComponent, {
      initialState,
      class: 'modal-dialog-centered'
    });
  }
}

