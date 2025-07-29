import { Component } from '@angular/core';
import { PeopleRegistrationComponent } from '../../components/people-registration/people-registration.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-home',
  imports: [PeopleRegistrationComponent, ToastModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
