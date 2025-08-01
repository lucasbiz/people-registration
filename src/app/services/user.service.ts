import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RawUsersResponse,
  User,
  UserForm,
  UsersData,
} from '../models/user.model';
import { baseApiUrl } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { payloadHelper } from '../helpers/user.helper';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http = inject(HttpClient);

  getUsers(page = 1, limit = 10): Observable<UsersData> {
    const params = { page: page.toString(), limit: limit.toString() };

    return this.http.get<RawUsersResponse>(`${baseApiUrl}`, { params }).pipe(
      map((response) => {
        return {
          users: response.results,
          currentPage: response.page,
          limit: response.limit,
          totalCount: response.count,
          totalPages: Math.ceil(response.count / response.limit),
        };
      }),
    );
  }

  createUser(userData: UserForm): Observable<User> {
    return this.http.post<User>(baseApiUrl, payloadHelper(userData));
  }

  deleteUser(userID: number): Observable<number> {
    return this.http.delete<number>(baseApiUrl + '/' + userID);
  }

  updateUser(id: number, userData: UserForm): Observable<User> {
    return this.http.patch<User>(
      `${baseApiUrl}/${id}`,
      payloadHelper(userData),
    );
  }
}
