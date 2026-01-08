import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RawUsersResponse,
  User,
  UserForm,
  UsersData,
} from '../shared/models/user.model';
import { map } from 'rxjs/operators';
import { payloadHelper } from '../shared/helpers/user.helper';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http = inject(HttpClient);

  getUsers(page: number, limit: number): Observable<UsersData> {
    const params = { page: (page + 1).toString(), limit: limit.toString() };
    return this.http.get<RawUsersResponse>('persons', { params }).pipe(
      map((response) => {
        return {
          users: response.results,
          currentPage: response.pagination.currentPage,
          limit: response.pagination.limit,
          totalCount: response.pagination.totalItems,
          totalPages: response.pagination.totalPages,
        };
      }),
    );
  }

  createUser(userData: UserForm): Observable<User> {
    return this.http.post<User>('persons', payloadHelper(userData));
  }

  deleteUser(userID: number): Observable<number> {
    return this.http.delete<number>('persons/' + userID);
  }

  updateUser(id: number, userData: UserForm): Observable<User> {
    return this.http.patch<User>(`persons/${id}`, payloadHelper(userData));
  }

  searchUser(searchInput: string): Observable<User[]> {
    const params = { searchTerm: searchInput };
    return this.http.get<User[]>('persons/search', { params });
  }
}
