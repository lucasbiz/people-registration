import { Component, DestroyRef, ViewChild, inject } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { ModalHelperService } from '../../services/modal-helper.service';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-people-registration',
  imports: [ButtonModule, UserListComponent],
  templateUrl: './people-registration.component.html',
  styleUrl: './people-registration.component.css',
})
export class PeopleRegistrationComponent {
  @ViewChild(UserListComponent) userListComponent!: UserListComponent;

  private destroyRef = inject(DestroyRef);
  private readonly modalHelperService = inject(ModalHelperService);
  private readonly toastService = inject(ToastService);

  newRegister(): void {
    this.userListComponent.onCreate();
  }
}
