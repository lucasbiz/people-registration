import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseApiUrl = 'https://dev-api-plt.4asset.net.br/exam/v1/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {

    return this.http.get<{ results: User[] }>(this.baseApiUrl + 'persons')
      .pipe(
        map(response => response.results)
      );
  }

  createUser(userData: any): Observable<any> {

    console.log(userData);
    const formattedDate = userData.birthDate.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3');

    console.log(formattedDate)

    const [day, month, year] = formattedDate.split('/');
    const isoDate = new Date(`${year}-${month}-${day}`).toISOString();
    console.log(isoDate)

    const payload = {
      ...userData,
      birthDate: isoDate,
    };

    return this.http.post(this.baseApiUrl + 'persons', payload);
  }




}
