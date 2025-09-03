import { Component, signal, ViewChild } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-people-registration',
  imports: [ButtonModule, UserListComponent, IconField, InputIcon, InputText],
  templateUrl: './people-registration.component.html',
  styleUrl: './people-registration.component.css',
})
export class PeopleRegistrationComponent {
  @ViewChild(UserListComponent) userListComponent!: UserListComponent;

  searchText = signal('');

  onSearchSubmit(inputText: string): void {
    this.userListComponent.onFilter(inputText);
  }

  newRegister(): void {
    this.userListComponent.onCreate();
  }
}
