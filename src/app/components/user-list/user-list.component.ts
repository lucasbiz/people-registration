import { Component, Input, OnInit } from '@angular/core';
import { UserRowComponent } from '../user-row/user-row.component';
import { User, UsersData } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/user.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalHelperService } from '../../services/modal-helper.service';
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

  constructor(private usersService: UsersService, private modalHelperService: ModalHelperService) {}

  ngOnInit(): void {
    this.renderUsers();
  };

  onEdit(user: User): void {

    this.modalHelperService.registerOrEdit('Editar cadastro', user);

  }

  onDelete(userId: number): void {

    this.modalHelperService.confirmDeletion().subscribe((confirmed)=> {
      if (confirmed) {
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
      }
    });
  }

  showDeletionSuccess(): void {

    const initialState = {
      modalTitle: 'Cadastro excluído com sucesso!'};

    console.log(initialState);


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
