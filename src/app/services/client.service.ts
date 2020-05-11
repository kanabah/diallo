import { baseUrl } from './backend';
import { Injectable } from '@angular/core';
import { Client } from '../interfaces/client';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private api = `${baseUrl}clients`;

  constructor(private http: HttpClient) { }

  addClient(client: Client): Observable<Client>{
    return this.http.post<Client>(`${this.api}/addClient`, client).pipe(
      retry(3)
    );
  }

  public telExist(tel: number): Observable<any>{
    return this.http.get<any>(`${this.api}/telExist/${tel}`).pipe(
      retry(3),
    )
  }

  public telExistByAdmi(tel: number): Observable<any>{
    return this.http.get<any>(`${this.api}/telExistByAdmi/${tel}`).pipe(
      retry(3),
    )
  }

  public telExistAddClient(tel: number): Observable<any>{
    return this.http.get<any>(`${this.api}/telExistAddClient/${tel}`).pipe(
      retry(3),
    )
  }

  public emailExist(email: string): Observable<any>{
    return this.http.get<any>(`${this.api}/existEmail/${email}`).pipe(
      retry(3),
    )
  }

  public allClient(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.api}/allClient`).pipe(
      retry(3)
    )
  }

  public allClientCommande(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.api}/allClientCommande`).pipe(
      retry(3)
    )
  }

  public getClients(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.api}/getClients`).pipe(
      retry(3)
    )
  }

  public getAllClients(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.api}/getAllClients`).pipe(
      retry(3)
    )
  }

  public allCommande(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.api}/allCommande`).pipe(
      retry(3)
    )
  }

  public clientDetailleCommande(id): Observable<Client>{
    return this.http.get<Client>(`${this.api}/clientDetailleCommande/${id}`).pipe(
      retry(3)
    )
  }

  public detaille(id): Observable<Client>{
    return this.http.get<Client>(`${this.api}/detaille/${id}`).pipe(
      retry(3)
    )
  }

  public getClient(id): Observable<Client>{
    return this.http.get<Client>(`${this.api}/getClient/${id}`).pipe(
      retry(3)
    )
  }

  public getCommandeCredit(id): Observable<Client>{
    return this.http.get<Client>(`${this.api}/getCommandeCredit/${id}`).pipe(
      retry(3)
    )
  }

  public periodeDetailleCommande(id, myParams): Observable<Client>{
    return this.http.get<Client>(`${this.api}/periodeDetailleCommande/${id}/${myParams}`).pipe(
      retry(3)
    )
  }

  public TypePayement(typePay): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.api}/TypePayement/${typePay}`).pipe(
      retry(3),
      
    )
  }

  public commandeCredit(periode): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.api}/commandeCredit/${periode}`).pipe(
      retry(3),
      
    )
  }

  public reglementList(cmd_id, client_id): Observable<any>{
    return this.http.get<any>(`${this.api}/reglementList/${cmd_id}/${client_id}`).pipe(
      retry(3)
    )
  }

  public getCommande(cmd_id, client_id): Observable<any>{
    return this.http.get<any>(`${this.api}/getCommande/${cmd_id}/${client_id}`).pipe(
      retry(3)
    )
  }
  
  public testMontantRelementCommande(montant, id): Observable<any>{
    return this.http.get<any>(`${this.api}/testMontantRelementCommande/${montant}/${id}`).pipe(
      retry(3)
    )
  }
  
  public deleteReglement(cmd_id, reglement_id, client_id): Observable<any>{
    return this.http.get<any>(`${this.api}/deleteReglement/${cmd_id}/${reglement_id}/${client_id}`).pipe(
      retry(3)
    )
  }
  
    public updateClient(id: string,client: Client): Observable<Client>{
      return this.http.put<Client>(`${this.api}/updateClient/${id}`, client).pipe(
        retry(3)
      )
    }
  
    public onUpdateCommande(cmd_id: string,client_id: string, user_id: string, commande: any): Observable<Client>{
      return this.http.put<Client>(`${this.api}/onUpdateCommande/${cmd_id}/${client_id}/${user_id}`, commande).pipe(
        retry(3)
      )
    }
  
  public addCommande(id: string,client: Client, user_id): Observable<Client>{
    return this.http.put<Client>(`${this.api}/addCommande/${id}/user_id/${user_id}`, client).pipe(
      retry(3)
    )
  }

  public addReglement(id: string,reglement: any, client_id): Observable<any>{
    return this.http.put<any>(`${this.api}/addReglement/${id}/${client_id}`, reglement).pipe(
      retry(3)
    )
  }

  public deleteCommande(id: string, client_id): Observable<any>{
    return this.http.get<any>(`${this.api}/deleteCommande/${id}/${client_id}`).pipe(
      retry(3)
    )
  }

  public onAujourdhui(client_id): Observable<any>{
    return this.http.get<any>(`${this.api}/onAujourdhui/${client_id}`).pipe(
      retry(5)
    )
  }

  public onSemaine(client_id): Observable<any>{
    return this.http.get<any>(`${this.api}/onSemaine/${client_id}`).pipe(
      retry(5)
    )
  }

  public onMonth(client_id): Observable<any>{
    return this.http.get<any>(`${this.api}/onMonth/${client_id}`).pipe(
      retry(5)
    )
  }

  public onTranche(client_id): Observable<any>{
    return this.http.get<any>(`${this.api}/onTranche/${client_id}`).pipe(
      retry(5)
    )
  }

  public onCredit(client_id): Observable<any>{
    return this.http.get<any>(`${this.api}/onCredit/${client_id}`).pipe(
      retry(5)
    )
  }

  public onTotalCmd(client_id): Observable<any>{
    return this.http.get<any>(`${this.api}/onTotalCmd/${client_id}`).pipe(
      retry(5)
    )
  }

  public periode(periode): Observable<any>{
    return this.http.get<any>(`${this.api}/periode/${periode}`).pipe(
      retry(3)
    )
  }

  public returnPeriode(periode): Observable<any>{
    return of(periode);
  }

  public returnInfoHome(): Observable<any>{
    return this.http.get<any>(`${this.api}/returnInfoHome`).pipe(
      retry(3)
    )
  }

  public getMontantClient(id, type): Observable<any>{
    return this.http.get<any>(`${this.api}/getMontantClient/${id}/${type}`).pipe(
      retry(3)
    )
  }

  //====UPLOADE IMAGE
  public upload(data) {
    return this.http.post<any>(`${this.api}/avatar`, data).pipe(
      retry(3),
    );
  }

}
