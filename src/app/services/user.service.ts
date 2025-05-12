import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User, UsersData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // private baseApiUrl = 'https://dev-api-plt.4asset.net.br/exam/v1/';
  private baseApiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  getUsers(page: number = 1, limit:number = 10): Observable<{
      results: User[],
      page: number,
      limit: number,
      count: number
    }> {
      const params = {page: page.toString(), limit: limit.toString()};
      return this.http.get<{
        results: User[],
        page: number,
        limit: number,
        count: number
      }>(`${this.baseApiUrl + 'persons'}`, {params});
  }

  createUser(userData: any): Observable<any> {

    const formattedDate = userData.birthDate.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3');
    const [day, month, year] = formattedDate.split('/');
    const isoDate = new Date(`${year}-${month}-${day}`).toISOString();

    const formattedPhone = userData.phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');

    const payload = {
      ...userData,
      phone: formattedPhone,
      birthDate: isoDate,
    };

    return this.http.post(this.baseApiUrl + 'persons', payload);
  }

  deleteUser(userID: number){
    return this.http.delete(this.baseApiUrl + 'persons/' + userID);
  }

  updateUser(id: number, userData: any): Observable<any>{

    const formattedDate = userData.birthDate.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3');
    const [day, month, year] = formattedDate.split('/');
    const isoDate = new Date(`${year}-${month}-${day}`).toISOString();

    const formattedPhone = userData.phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');

    const payload = {
      ...userData,
      phone: formattedPhone,
      birthDate: isoDate,
    };

    return this.http.put(`${this.baseApiUrl}persons/${id}`, payload);
  }


// user.service.ts
loadUsers(page: number = 1, limit: number = 10): Observable<UsersData> {
  console.log("loadusers executado")
  return this.getUsers(page, limit).pipe(
    map(response => {
      return {
        users: response.results,
        currentPage: response.page,
        limit: response.limit,
        totalCount: response.count,
        totalPages: Math.ceil(response.count / response.limit)
      } as UsersData;
    })
  );
}


}
