import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserRowComponent } from "../user-row/user-row.component";
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../user.service';


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

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers(1);
  };

  onEdit(userId: number): void {};

  onDelete(userId: number): void {

    this.usersService.deleteUser(userId).subscribe({
      complete: () => {
        this.usersData.users = this.usersData.users.filter(user => user.id !== userId);
        console.log("Usuário deletado com sucesso");
      },
      error: (err) => {
        console.error(err);
      }
    })

  };

  loadUsers(pageNumber : number){
    this.loadUsersCall.emit(pageNumber);
  }

}
