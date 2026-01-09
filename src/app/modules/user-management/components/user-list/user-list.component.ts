import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { UsersData, User } from '../../../../shared/models/user.model';
import { CommonModule } from '@angular/common';
import { UsersService } from '@services/user.service';
import { ModalHelperService } from '@services/modal-helper.service';
import { filter, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '@services/toast.service';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-user-list',
  imports: [
    CommonModule,
    PaginatorModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly usersService = inject(UsersService);
  private readonly modalHelperService = inject(ModalHelperService);
  private readonly toastService = inject(ToastService);
  public loading = signal(true);

  public usersPage = signal<UsersData>({
    users: [],
    currentPage: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
  });

  ngOnInit(): void {
    this.onPageChange({ first: 0, rows: this.usersPage().limit });
  }

  onFilter(inputText: string) {
    const term = inputText;

    if (!term) {
      this.onPageChange({ first: 0, rows: this.usersPage().limit });
    }

    this.usersService.searchUser(inputText).subscribe({
      next: (res) => {
        this.usersPage().users = res;
      },
    });
  }

  onCreate() {
    this.modalHelperService
      .registerOrEdit('Criar novo cadastro')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.onPageChange({
            first: 0,
            rows: this.usersPage().limit,
          });
        },
        error: () => {
          this.toastError('Erro!', 'Erro ao criar novo usuário');
        },
      });
  }

  onEdit(user: User): void {
    this.modalHelperService
      .registerOrEdit('Editar cadastro', user)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: boolean) => {
        if (result) {
          this.onPageChange({
            first: this.usersPage().currentPage - 1,
            rows: this.usersPage().limit,
          });
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
          this.modalHelperService.showSuccessMessage(
            'Cadastro excluído com sucesso!',
          );
          const pageToLoad =
            this.usersPage().users.length === 1 &&
            this.usersPage().currentPage > 1
              ? this.usersPage().currentPage - 2
              : this.usersPage().currentPage - 1;
          this.onPageChange({
            first: pageToLoad,
            rows: this.usersPage().limit,
          });
        },
        error: () => this.toastError('Erro!', 'Erro ao excluir usuário'),
      });
  }

  onPageChange(event: TablePageEvent): void {
    this.loading.set(true);
    this.usersService
      .getUsers(event.first ?? 1, event.rows ?? 10)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: UsersData) => {
          this.usersPage.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.toastError('Erro!', 'Erro ao carregar usuários');
          this.loading.set(false);
        },
      });
  }

  toastError(messageTitle: string, messageText: string): void {
    this.toastService.showError(messageTitle, messageText);
  }
}
