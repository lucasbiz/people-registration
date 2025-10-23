import { Component, inject, ViewChild } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-people-registration',
  imports: [
    ButtonModule,
    UserListComponent,
    InputText,
    InputIcon,
    IconField,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './people-registration.component.html',
})
export class PeopleRegistrationComponent {
  @ViewChild(UserListComponent) userListComponent!: UserListComponent;

  searchForm: FormGroup;
  private readonly fb = inject(FormBuilder);

  constructor() {
    this.searchForm = this.fb.group({
      searchText: this.fb.control('', { updateOn: 'submit' }),
    });
  }

  onSearch() {
    const term = this.searchForm.get('searchText')?.value;
    this.userListComponent.onFilter(term);
  }

  newRegister(): void {
    this.userListComponent.onCreate();
  }
}
