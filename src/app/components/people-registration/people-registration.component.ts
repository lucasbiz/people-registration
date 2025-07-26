import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { ModalHelperService } from '../../services/modal-helper.service';
import { ButtonModule } from 'primeng/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-people-registration',
  imports: [ButtonModule, UserListComponent],
  templateUrl: './people-registration.component.html',
  styleUrl: './people-registration.component.css'
})

export class PeopleRegistrationComponent {

  @ViewChild(UserListComponent) userListComponent!: UserListComponent;

  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private modalHelperService: ModalHelperService) {}

  newRegister():void {
    this.modalHelperService.registerOrEdit('Criar novo cadastro').pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {this.userListComponent.renderUsers(this.userListComponent.usersData.currentPage);}
    });
  }
}
