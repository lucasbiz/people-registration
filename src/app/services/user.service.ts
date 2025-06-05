import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { UsersData, RawUsersResponse, UserForm, User } from '../models/user.model';
import { baseApiUrl } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(page: number = 1, limit: number = 10): Observable<UsersData> {
    const params = { page: page.toString(), limit: limit.toString() };
  
    return this.http.get<RawUsersResponse>(`${baseApiUrl}`, { params }).pipe(
      map(response => {
        return {
          users: response.results,
          currentPage: response.page,
          limit: response.limit,
          totalCount: response.count,
          totalPages: Math.ceil(response.count / response.limit),
        };
      })
    );
  }

  createUser(userData: UserForm): Observable<User> {

    const formattedDate = userData.birthDate.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3');
    const [day, month, year] = formattedDate.split('/');
    const isoDate = new Date(`${year}-${month}-${day}`).toISOString();

    const formattedPhone = userData.phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');

    const payload = {
      ...userData,
      phone: formattedPhone,
      birthDate: isoDate,
    };

    return this.http.post<User>(baseApiUrl, payload);
  }

  deleteUser(userID: number){
    return this.http.delete(baseApiUrl + '/' + userID);
  }

  updateUser(id: number, userFormValue: UserForm): Observable<User> {
    
    let birthDate: string = userFormValue.birthDate;
    if (birthDate) {
      const formattedDate = birthDate.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3');
      const [day, month, year] = formattedDate.split('/');
      birthDate = new Date(`${year}-${month}-${day}`).toISOString();
    }

    let phone = userFormValue.phone;
    if (phone) {
      phone = phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }

    const payload = {
      ...userFormValue,
      phone: phone,
      birthDate: birthDate,
    };

    return this.http.patch<User>(`${baseApiUrl}/${id}`, payload);
  }




}
