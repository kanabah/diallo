import { baseUrl } from './backend';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { retry } from 'rxjs/operators';
import { TokenResponse } from '../interfaces/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  api = `${baseUrl}users`;
  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

  public getUserDetails(): User {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/login');
  }

  public register(user: User): Observable<User>{
    console.log('Je suis kana bah');
    return this.http.post<User>(`${this.api}/addUser`, user).pipe(
      retry(3),
      
    );
  }

  public updatePassword(user: any, id): Observable<User>{
    return this.http.put<any>(`${this.api}/updatePassword/${id}`, user).pipe(
      retry(3),
    );
  }

  public login(user: any): Observable<any>{
    return this.http.post<any>(`${this.api}/login`, user).pipe(
      retry(3),
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    )
  }

  public profile(): Observable<User>{
    return this.http.get<User>(`${this.api}/profile`).pipe(
      retry(3),      
    )
  }

  public emailExist(email: string): Observable<any>{
    return this.http.get<any>(`${this.api}/existEmail/${email}`).pipe(
      retry(3),
    )
  }

  public telExist(tel: number): Observable<any>{
    return this.http.get<any>(`${this.api}/telExist/${tel}`).pipe(
      retry(3),
    )
  }

  public telExistPromoteur(tel: number): Observable<any>{
    return this.http.get<any>(`${this.api}/telExistPromoteur/${tel}`).pipe(
      retry(3),
    )
  }

  public updateUser(id: string, user: User): Observable<any>{
    return this.http.put<User>(`${this.api}/updateUser/${id}`, user).pipe(
      retry(3)
    )
  }
  
  public getRole(role){
    if(role == 'user'){
      return true;
    }else if(role == 'admi'){
      return false;
    }
  }

  public newUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.api}/newUsers`).pipe(
      retry(3)
    );
  }

  public acpetUser(id): Observable<User>{
    return this.http.get<User>(`${this.api}/acpetUser/${id}`).pipe(
      retry(3)
    );
  }

  public declineUser(id): Observable<User>{
    return this.http.get<User>(`${this.api}/declineUser/${id}`).pipe(
      retry(3)
    );
  }

  public getAllUsersActive(): Observable<User[]>{
    return this.http.get<User[]>(`${this.api}/getAllUsersActive`).pipe(
      retry(3)
    );
  }

  public getAllPromoteurs(user_id): Observable<User[]>{
    return this.http.get<User[]>(`${this.api}/getAllPromoteurs/${user_id}`).pipe(
      retry(3)
    );
  }

  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.api}/getUsers/`).pipe(
      retry(3)
    );
  }

  public changeEtatUser(id): Observable<User>{
    return this.http.get<User>(`${this.api}/changeEtatUser/${id}`).pipe(
      retry(3)
    );
  }

  public updateDebitPromoteurForAgence(user, id, id_sold): Observable<User>{
    return this.http.put<User>(`${this.api}/updateDebitPromoteurForAgence/${id}/${id_sold}`, user).pipe(
      retry(3)
    );
  }

  public deleteDebitPromoteurForAgence(id, id_sold): Observable<User>{
    return this.http.get<User>(`${this.api}/deleteDebitPromoteurForAgence/${id}/${id_sold}`).pipe(
      retry(3)
    );
  }

  public attriButeRole(id, role, agence_id): Observable<User>{
    agence_id = agence_id == '' ? 'Select' : agence_id;
    return this.http.get<User>(`${this.api}/attriButeRole/${id}/${role}/${agence_id}`).pipe(
      retry(3)
    );
  }

  public addSoldePromoteur(id, promoteur): Observable<User>{
    return this.http.put<User>(`${this.api}/addSoldePromoteur/${id}`, promoteur).pipe(
      retry(3)
    );
  }

  public getPromoteur(id, agence_id): Observable<User>{
    return this.http.get<User>(`${this.api}/getPromoteur/${id}/${agence_id}`).pipe(
      retry(3)
    );
  }

  public getUser(id): Observable<User>{
    return this.http.get<User>(`${this.api}/getUser/${id}`).pipe(
      retry(3)
    );
  }

}
