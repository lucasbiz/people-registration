import { Component, OnInit } from '@angular/core';
import { UserRowComponent } from "../user-row/user-row.component";
import { MOCK_USERS } from '../../sampleUsers';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [UserRowComponent, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  ngOnInit(): void {
    this.users = MOCK_USERS.results
  };

  onEdit (userId: number): void {

  };

  onDelete (userId: number): void {
    this.users = this.users.filter(u => u.id != userId);
  }

}
