import { Component, DestroyRef, ViewChild, inject } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { ModalHelperService } from '../../services/modal-helper.service';
import { ButtonModule } from 'primeng/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-people-registration',
  imports: [ButtonModule, UserListComponent],
  templateUrl: './people-registration.component.html',
  styleUrl: './people-registration.component.css',
})
export class PeopleRegistrationComponent {
  @ViewChild(UserListComponent) userListComponent!: UserListComponent;

  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private modalHelperService: ModalHelperService,
    private toastService: ToastService,
  ) {}

  newRegister(): void {
    this.modalHelperService
      .registerOrEdit('Criar novo cadastro')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.userListComponent.renderUsers(
            this.userListComponent.usersData.currentPage,
          );
        },
        error: () => {
          this.toastService.showError('Erro!', 'Erro ao criar novo usuário');
        },
      });
  }
}
