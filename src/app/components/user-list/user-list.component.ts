import {
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
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
  private readonly destroyRef = inject(DestroyRef);
  private readonly usersService = inject(UsersService);
  private readonly modalHelperService = inject(ModalHelperService);
  private readonly toastService = inject(ToastService);

  public searchTerm = signal('');
  private currentPageUsers = signal<User[]>([]);

  public totalCount = 0;
  public rows = 10;
  public currentPage = 1;

  public filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const users = this.currentPageUsers();

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
            page: this.currentPage - 1,
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
          this.onPageChange({ page: this.currentPage - 1 });
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
            this.currentPageUsers().length === 1 && this.currentPage > 1
              ? this.currentPage - 2
              : this.currentPage - 1;
          this.onPageChange({ page: pageToLoad, rows: this.rows });
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
          this.currentPageUsers.set(data.users);
          this.totalCount = data.totalCount;
          this.rows = data.limit;
          this.currentPage = data.currentPage;
        },
        error: () => {
          this.toastService.showError('Erro!', 'Erro ao carregar usuários');
        },
      });
  }
}
