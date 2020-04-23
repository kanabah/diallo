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

  public listeSortieCaissse(): Observable<Promoteur[]>{
    return this.http.get<Promoteur[]>(`${this.api}/listeSortieCaissse`).pipe(
      retry(3)
    );
  }

  public getCaisseById(id): Observable<Promoteur>{
    return this.http.get<Promoteur>(`${this.api}/getCaisseById/${id}`).pipe(
      retry(3)
    )
  }

  public getPromoteurByUserId(): Observable<Promoteur>{
    return this.http.get<Promoteur>(`${this.api}/getPromoteurByUserId`).pipe(
      retry(3)
    )
  }

  public deleteCaisseById(id): Observable<Promoteur>{
    return this.http.get<Promoteur>(`${this.api}/deleteCaisseById/${id}`).pipe(
      retry(3)
    )
  }

  public getPromoteurByUserIdForAgenceAndAdmi(id): Observable<Promoteur[]>{
    return this.http.get<Promoteur[]>(`${this.api}/getPromoteurByUserIdForAgenceAndAdmi/${id}`).pipe(
      retry(3)
    )
  }

  public updatedCaisse(id, promoteur: Promoteur): Observable<Promoteur>{
    return this.http.put<Promoteur>(`${this.api}/updatedCaisse/${id}`, promoteur).pipe(
      retry(3)
    );
  }
}
