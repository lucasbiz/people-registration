import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [HomeComponent, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'people-registration';
}
