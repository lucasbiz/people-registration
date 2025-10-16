import {
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { UserRowComponent } from '../user-row/user-row.component';
import { UsersData, User } from '../../../../shared/models/user.model';
import { CommonModule } from '@angular/common';
import { UsersService } from '@services/user.service';
import { ModalHelperService } from '@services/modal-helper.service';
import { filter, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '@services/toast.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-user-list',
  imports: [UserRowComponent, CommonModule, PaginatorModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly usersService = inject(UsersService);
  private readonly modalHelperService = inject(ModalHelperService);
  private readonly toastService = inject(ToastService);

  public searchTerm = signal('');
  public usersPage = signal<UsersData>({
    users: [],
    currentPage: 0,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
  });

  public filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const users = this.usersPage().users;

    if (!term) {
      return users;
    }

    return users.filter((user) => user.name.toLowerCase().includes(term));
  });

  ngOnInit(): void {
    this.onPageChange({ page: 0 });
  }

  onFilter(inputText: string) {
    this.searchTerm.set(inputText);
  }

  onCreate() {
    this.modalHelperService
      .registerOrEdit('Criar novo cadastro')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.onPageChange({
            page: this.usersPage().currentPage - 1,
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
          this.onPageChange({ page: this.usersPage().currentPage - 1 });
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
          this.onPageChange({ page: pageToLoad, rows: this.usersPage().limit });
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
          this.usersPage.set(data);
        },
        error: () => {
          this.toastService.showError('Erro!', 'Erro ao carregar usuários');
        },
      });
  }
}
