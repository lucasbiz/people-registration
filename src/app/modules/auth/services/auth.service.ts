import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserLogin } from '../../../shared/models/auth.model';
import { toLowerCase } from '../../../shared/utils/string.utils';
import { baseApiUrl } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';
import {
  RegisterUserInputs,
  ResponseToken,
} from '../../../shared/models/auth.model';
import { payloadHelper } from '../../../shared/helpers/user.helper';
import { User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  loginUser(credentials: UserLogin): Observable<ResponseToken> {
    const sanitizedCredentials = {
      ...credentials,
      email: toLowerCase(credentials.email),
    };
    return this.http
      .post<ResponseToken>(`${baseApiUrl}auth/login`, sanitizedCredentials)
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
        }),
      );
  }

  registerNewUser(userData: RegisterUserInputs): Observable<User> {
    return this.http.post<User>(
      `${baseApiUrl}auth/register`,
      payloadHelper(userData),
    );
  }
}
