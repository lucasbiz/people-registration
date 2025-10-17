import { Component, ViewChild } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { ButtonModule } from 'primeng/button';
// import { IconField } from 'primeng/iconfield';
// import { InputIcon } from 'primeng/inputicon';
// import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-people-registration',
  imports: [ButtonModule, UserListComponent],
  templateUrl: './people-registration.component.html',
})
export class PeopleRegistrationComponent {
  @ViewChild(UserListComponent) userListComponent!: UserListComponent;

  // searchText = signal('');

  // onInput(e: Event): void {
  //   const event = (e.target as HTMLInputElement).value;
  //   this.searchText.set(event);
  // }

  // onSearchChange = effect(() => {
  //   const value = this.searchText();
  //   this.userListComponent.onFilter(value);
  // });

  newRegister(): void {
    this.userListComponent.onCreate();
  }
}
