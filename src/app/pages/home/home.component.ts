import { Component } from '@angular/core';
import { PeopleRegistrationComponent } from '../../components/people-registration/people-registration.component';

@Component({
  selector: 'app-home',
  imports: [PeopleRegistrationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
