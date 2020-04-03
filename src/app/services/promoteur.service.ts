import { Observable } from 'rxjs/Observable';
import { Promoteur } from './../interfaces/promoteur';
import { Injectable } from '@angular/core';
import { baseUrl } from './backend';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromoteurService {
  private api = `${baseUrl}promoteurs`;

  constructor(private http: HttpClient) { }

  public entrerCaisse(entrerCaisse: Promoteur): Observable<Promoteur>{
    return this.http.post<Promoteur>(`${this.api}/entrerCaisse`, entrerCaisse).pipe(
      retry(3)
    );
  }

  public listeEntrerCaissse(): Observable<Promoteur[]>{
    return this.http.get<Promoteur[]>(`${this.api}/listeEntrerCaissse`).pipe(
      retry(3)
    );
  }
}
