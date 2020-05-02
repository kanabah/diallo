import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Guichet } from './../interfaces/guichet';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from './backend';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuichetService {
  private api = `${baseUrl}guichets`;
  
  constructor(private http: HttpClient) { }

  addGuichet(guichet: Guichet): Observable<Guichet>{
    return this.http.post<Guichet>(`${this.api}/addGuichet`, guichet).pipe(
      retry(3)
    )
  }

  getGuichets(): Observable<Guichet[]>{
    return this.http.get<Guichet[]>(`${this.api}/getGuichets`).pipe(
      retry(3)
    )
  }

  deleteGuichet(id): Observable<Guichet>{
    return this.http.get<Guichet>(`${this.api}/deleteGuichet/${id}`).pipe(
      retry(3)
    )
  }

  changeAutorisation(id): Observable<Guichet>{
    return this.http.get<Guichet>(`${this.api}/changeAutorisation/${id}`).pipe(
      retry(3)
    )
  }

  uodateGuichet(id, guichet): Observable<Guichet>{
    return this.http.put<Guichet>(`${this.api}/uodateGuichet/${id}`, guichet).pipe(
      retry(3)
    )
  }

  updateGuichetAgence(id, guichet): Observable<Guichet>{
    return this.http.put<Guichet>(`${this.api}/updateGuichetAgence/${id}`, guichet).pipe(
      retry(3)
    )
  }
}
