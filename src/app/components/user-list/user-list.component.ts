import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserRowComponent } from "../user-row/user-row.component";
import { UsersData } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/user.service';
import { ConfirmDeletionModalComponent } from '../confirm-deletion-modal/confirm-deletion-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalHelperService } from '../../services/modal-helper.service';
import { RegisterModalComponent } from '../register-modal/register-modal.component';

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

  @Output() renderUsersCall = new EventEmitter<number>();

  bsModalRef?: BsModalRef;

  constructor(private usersService: UsersService, private modalService: BsModalService, private modalHelperService: ModalHelperService) {}

  ngOnInit(): void {
    this.renderUsers(1);
  };

  onEdit(userId: number) {

    const initialState = {
        modalTitle: 'Editar cadastro',
        saveButtonText: 'Salvar alterações'
      }

      this.bsModalRef = this.modalService.show(RegisterModalComponent, {
        initialState,
        class: 'modal-dialog-centered'
      });

      this.bsModalRef.content.userCreated.subscribe(() => {
        // this.renderUsers(this.usersData.currentPage);
      });
    };

  onDelete(userId: number) {

    this.bsModalRef = this.modalService.show(ConfirmDeletionModalComponent, {
      class: 'modal-dialog-centered'
    });

    this.bsModalRef.content.userDeleted.subscribe(() => {
      this.usersService.deleteUser(userId).subscribe({
        complete: () => {
          this.usersData.users = this.usersData.users.filter(user => user.id !== userId);
          this.showDeletionSuccess();
        },
        error: (err) => {
          console.error(err);
        }
      })
    })
  };

  showDeletionSuccess() {

    const initialState = {
      modalTitle: 'Cadastro excluído com sucesso!'
    }
    this.modalHelperService.showActionSucess(initialState)
    }

  renderUsers(pageNumber : number = 1){
    this.usersService.loadUsers(pageNumber).subscribe({
      next: (data: UsersData) => {
        this.usersData = data;
      },
      error: (err) => {
        console.error('Erro ao carregar usuários:', err);
      }
    });
  }

}
