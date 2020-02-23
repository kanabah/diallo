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

  public updateUser(id: string, user: User): Observable<any>{
    return this.http.put<User>(`${this.api}/updateUser/${id}`, user).pipe(
      retry(3)
    )
  }


}
