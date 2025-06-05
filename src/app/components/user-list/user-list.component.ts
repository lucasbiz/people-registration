import { Component, Input, OnInit } from '@angular/core';
import { UserRowComponent } from '../user-row/user-row.component';
import { User, UsersData } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/user.service';
import { ConfirmDeletionModalComponent } from '../../modals/confirm-deletion-modal/confirm-deletion-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalHelperService } from '../../services/modal-helper.service';
import { RegisterModalComponent } from '../../modals/register-modal/register-modal.component';
import { take } from 'rxjs';


@Component({
  selector: 'app-user-list',
  imports: [UserRowComponent, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {


  @Input() usersData: UsersData = {
    users: [],
    currentPage: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
  };


  bsModalRef?: BsModalRef;

  constructor(private usersService: UsersService, private modalService: BsModalService, private modalHelperService: ModalHelperService) {}

  ngOnInit(): void {
    this.renderUsers();
  };

  onEdit(user: User): void {

    const initialState = {
        modalTitle: 'Editar cadastro',
        saveButtonText: 'Salvar alterações',
        userData: user
      };

    this.bsModalRef = this.modalService.show(RegisterModalComponent, {
      initialState,
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.renderUsersCall.subscribe(() => {
      this.renderUsers(this.usersData.currentPage);
    });
    };

  onDelete(userId: number): void {

    this.bsModalRef = this.modalService.show(ConfirmDeletionModalComponent, {
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.userDeleted.pipe(take(1)).subscribe(() => {
      this.usersService.deleteUser(userId).pipe(take(1)).subscribe({
        next: () => {
          this.usersData.users = this.usersData.users.filter(u => u.id !== userId);
          this.usersData.totalCount--;
          this.showDeletionSuccess();
        },
        error: (err) => {
          console.error(err);
        }
      });
    });
  };

  showDeletionSuccess(): void {

    const initialState = {
      modalTitle: 'Cadastro excluído com sucesso!'};

    this.modalHelperService.showActionSucess(initialState);

    };

  renderUsers(pageNumber : number = 1): void{

    this.usersService.getUsers(pageNumber).subscribe({
      next: (data: UsersData) => {
        this.usersData = data;
      },
      error: (err) => {
        console.error('Erro ao carregar usuários:', err);
      }
    });
  }

}
