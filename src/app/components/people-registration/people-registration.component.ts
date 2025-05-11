import { Component } from '@angular/core';
import { InputButtonComponent } from '../input-button/input-button.component';
import { UserListComponent } from '../user-list/user-list.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { UsersService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-people-registration',
  imports: [InputButtonComponent, UserListComponent],
  templateUrl: './people-registration.component.html',
  styleUrl: './people-registration.component.css'
})
export class PeopleRegistrationComponent {

  usersData: {
    users: User[],
    currentPage: number,
    limit: number,
    totalCount: number,
    totalPages: number
  } = {
    users: [],
    currentPage: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
  };


  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private usersService: UsersService) {

  }

  newRegister() {

    const initialState = {
      modalTitle: 'Criar novo cadastro',
      saveButtonText: 'Novo cadastro'
    }

    this.bsModalRef = this.modalService.show(RegisterModalComponent, {
      initialState,
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.userCreated.subscribe(() => {
      this.loadUsers();
    })
  }


  loadUsers( page: number = 1 ){
    this.usersService.getUsers(page, this.usersData.limit).subscribe(response => {
      this.usersData.users = response.results;
      this.usersData.currentPage = response.page;
      this.usersData.limit = response.limit;
      this.usersData.totalCount = response.count;
      this.usersData.totalPages = Math.ceil(this.usersData.totalCount/this.usersData.limit);
    })

  };

}


