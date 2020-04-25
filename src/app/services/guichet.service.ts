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
}
