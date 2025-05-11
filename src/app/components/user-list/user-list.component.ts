import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserRowComponent } from "../user-row/user-row.component";
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/user.service';
import { ConfirmDeletionModalComponent } from '../confirm-deletion-modal/confirm-deletion-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalHelperService } from '../../services/modal-helper.service';

@Component({
  selector: 'app-user-list',
  imports: [UserRowComponent, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {


  @Input() usersData: {
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

  @Output() loadUsersCall = new EventEmitter<number>();

  bsModalRef?: BsModalRef;

  constructor(private usersService: UsersService, private modalService: BsModalService, private modalHelperService: ModalHelperService) {}

  ngOnInit(): void {
    this.loadUsers(1);
  };

  onEdit(userId: number): void {};

  onDelete(userId: number): void {

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

  loadUsers(pageNumber : number){
    this.loadUsersCall.emit(pageNumber);
  }

}
