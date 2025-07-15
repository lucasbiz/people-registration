import { Component, Input, OnInit } from '@angular/core';
import { UserRowComponent } from '../user-row/user-row.component';
import { User, UsersData } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/user.service';
import { ModalHelperService } from '../../services/modal-helper.service';
import { filter, switchMap, take } from 'rxjs';

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

  constructor(private usersService: UsersService, private modalHelperService: ModalHelperService) {}

  ngOnInit(): void {
    this.renderUsers();
  };

  onEdit(user: User): void {

    this.modalHelperService.registerOrEdit('Editar cadastro', user).subscribe((result: boolean)=> {
      if (result) {
        this.renderUsers(this.usersData.currentPage);
      }
    });
  };

  onDelete(userId: number): void {

    this.modalHelperService.confirmDeletion().pipe(
      take(1),
      filter((confirmed)=> confirmed),
      switchMap(()=> this.usersService.deleteUser(userId)),
    )
    .subscribe({
      next: () => {
        this.usersData.users = this.usersData.users.filter((user) => user.id !== userId);
        this.modalHelperService.showSuccessMessage('Cadastro excluído com sucesso!');
      },
      error: err => console.log(err)
    });
  };


  public renderUsers(pageNumber : number = 1): void{

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
