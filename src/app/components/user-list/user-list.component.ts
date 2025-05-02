import { Component, OnInit } from '@angular/core';
import { UserRowComponent } from "../user-row/user-row.component";
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-user-list',
  imports: [UserRowComponent, CommonModule, HttpClientModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  };

  onEdit (userId: number): void {

  };

  onDelete (userId: number): void {
    this.users = this.users.filter(u => u.id != userId);
  }

}
