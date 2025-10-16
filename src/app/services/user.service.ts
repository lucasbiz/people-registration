import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RawUsersResponse,
  User,
  UserForm,
  UsersData,
} from '../shared/models/user.model';
import { baseApiUrl } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { payloadHelper } from '../shared/helpers/user.helper';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http = inject(HttpClient);

  getUsers(page: number, limit: number): Observable<UsersData> {
    const params = { page: (page + 1).toString(), limit: limit.toString() };

    return this.http
      .get<RawUsersResponse>(`${baseApiUrl}persons`, { params })
      .pipe(
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
    return this.http.post<User>(
      `${baseApiUrl}persons`,
      payloadHelper(userData),
    );
  }

  deleteUser(userID: number): Observable<number> {
    return this.http.delete<number>(baseApiUrl + 'persons/' + userID);
  }

  updateUser(id: number, userData: UserForm): Observable<User> {
    return this.http.patch<User>(
      `${baseApiUrl}persons/${id}`,
      payloadHelper(userData),
    );
  }
}
