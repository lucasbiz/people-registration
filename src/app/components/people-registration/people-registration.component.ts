import { Component } from '@angular/core';
import { InputButtonComponent } from '../input-button/input-button.component';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-people-registration',
  imports: [InputButtonComponent, UserListComponent],
  templateUrl: './people-registration.component.html',
  styleUrl: './people-registration.component.css'
})
export class PeopleRegistrationComponent {


  newRegister() {
    
  }

}
