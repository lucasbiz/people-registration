import { Component, OnInit } from '@angular/core';
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

  users: User[] = [];
  currentPage = 1;
  limit = 10;
  totalCount = 0;
  totalPages = 0;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  };

  onEdit(userId: number): void {};

  onDelete(userId: number): void {
    this.users = this.users.filter(u => u.id != userId);
  };

  loadUsers( page: number = 1 ){
    this.userService.getUsers(page, this.limit).subscribe(response => {
      this.users = response.results;
      this.currentPage = response.page;
      this.limit = response.limit;
      this.totalCount = response.count;
      this.totalPages = Math.ceil(this.totalCount/this.limit);
    })

  };

}
