import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { UserRowComponent } from '../user-row/user-row.component';
import { User, UsersData } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/user.service';
import { ModalHelperService } from '../../services/modal-helper.service';
import { filter, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '../../services/toast.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-user-list',
  imports: [UserRowComponent, CommonModule, PaginatorModule],
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

  private readonly destroyRef = inject(DestroyRef);
  private readonly usersService = inject(UsersService);
  private readonly modalHelperService = inject(ModalHelperService);
  private readonly toastService = inject(ToastService);

  ngOnInit(): void {
    this.onPageChange({ page: 0 });
  }

  onFilter(inputText: string) {
    console.log(inputText);
  }

  onCreate() {
    this.modalHelperService
      .registerOrEdit('Criar novo cadastro')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.onPageChange({
            page: this.usersData.currentPage - 1,
          });
        },
        error: () => {
          this.toastService.showError('Erro!', 'Erro ao criar novo usuário');
        },
      });
  }

  onEdit(user: User): void {
    this.modalHelperService
      .registerOrEdit('Editar cadastro', user)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: boolean) => {
        if (result) {
          this.onPageChange({ page: this.usersData.currentPage - 1 });
        }
      });
  }

  onDelete(userId: number): void {
    this.modalHelperService
      .confirmDeletion()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((confirmed) => confirmed),
        switchMap(() => this.usersService.deleteUser(userId)),
      )
      .subscribe({
        next: () => {
          this.usersData.users = this.usersData.users.filter(
            (user) => user.id !== userId,
          );
          if (this.usersData.users.length === 0) {
            this.onPageChange({ page: this.usersData.currentPage - 2 });
          } else {
            this.onPageChange({ page: this.usersData.currentPage - 1 });
          }
          this.modalHelperService.showSuccessMessage(
            'Cadastro excluído com sucesso!',
          );
        },
        error: () =>
          this.toastService.showError('Erro!', 'Erro ao excluir usuário'),
      });
  }

  onPageChange(event: PaginatorState) {
    this.usersService
      .getUsers(event.page ?? 1, event.rows ?? 10)
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
