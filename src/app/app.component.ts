import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [HomeComponent, ButtonModule],
  template: '<app-home></app-home>',
})
export class AppComponent {
  title = 'people-registration';
}
