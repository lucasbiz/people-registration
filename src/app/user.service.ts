import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'https://dev-api-plt.4asset.net.br/exam/v1/persons';

  constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {

  return this.http.get<{ results: User[] }>(this.apiUrl)
    .pipe(
      map(response => response.results)
    );

}




}
