import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { PeopleRegistrationComponent } from '../user-management/components/people-registration/people-registration.component';

@Component({
  selector: 'app-home',
  imports: [PeopleRegistrationComponent, ToastModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
