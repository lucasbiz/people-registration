import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { UserRowComponent } from '../user-row/user-row.component';
import { User, UsersData } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/user.service';
import { ModalHelperService } from '../../services/modal-helper.service';
import { filter, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-user-list',
  imports: [UserRowComponent, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  @Input() usersData: UsersData = {
    users: [],
    currentPage: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
  };

  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private usersService: UsersService,
    private modalHelperService: ModalHelperService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.renderUsers();
  }

  onEdit(user: User): void {
    this.modalHelperService
      .registerOrEdit('Editar cadastro', user)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: boolean) => {
        if (result) {
          this.renderUsers(this.usersData.currentPage);
        }
      });
  }

  onDelete(userId: number): void {
    this.modalHelperService
      .confirmDeletion()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((confirmed) => confirmed),
        switchMap(() => this.usersService.deleteUser(userId))
      )
      .subscribe({
        next: () => {
          this.usersData.users = this.usersData.users.filter(
            (user) => user.id !== userId
          );
          this.modalHelperService.showSuccessMessage(
            'Cadastro excluído com sucesso!'
          );
        },
        error: (err) => console.log(err),
      });
  }

  public renderUsers(pageNumber: number = 1): void {
    this.usersService
      .getUsers(pageNumber)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: UsersData) => {
          this.usersData = data;
        },
        error: () => {
          this.toastService.showError('Erro!', 'Erro ao carregar usuários');
        },
      });
  }
}
