import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, ToastModule, RouterOutlet],
  template: `<router-outlet></router-outlet> <p-toast></p-toast>`,
})
export class AppComponent {
  title = 'people-registration';
}
