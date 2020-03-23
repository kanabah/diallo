import { PrintClientService } from './../../services/print-client.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from 'src/app/services/client.service';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Client } from 'src/app/interfaces/client';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-commande-credit',
  templateUrl: './commande-credit.component.html',
  styleUrls: ['./commande-credit.component.css']
})
export class CommandeCreditComponent implements OnInit {
  dataSource: any[] = [];
  commandes: any[] = [];
  client: Client;
  clients = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  myParams: any;
  periodeCmd: any;
  $commandesCredit: any;
  $ok: any;

  constructor(private router: Router, private snackBar: SnackBarService ,private route: ActivatedRoute, private clientService: ClientService, public print: PrintClientService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.clientService.returnPeriode(params.get('periode')), 
      ),
    ).subscribe(result => {
      this.myParams = result;
      this.getCommandeCredit();

      if(this.myParams == 'all'){
        this.periodeCmd = 'Total';
      }else if(this.myParams == 'week'){
        this.periodeCmd = 'De La Semmaine';
      }else if( this.myParams == 'month'){
        this.periodeCmd = 'Du Mois';
      }else if(this.myParams == 'year'){
        this.periodeCmd = "l'Annee"
      }else if(this.myParams == 'today'){
        this.periodeCmd = "Aujourdh'hui";
      }
    })

    
  }

  //DATA TABLE
  displayedColumns: string[] = ['avatar', 'nom', 'prenom', 'adress.commune', 'adress.quartier', 'adress.secteur', 'telOrange', 'telMtn', 'telCelcom', 'telPerso', '_id'];
    
  applyFilter(filterValue: string) {
    this.clients.filter = filterValue.trim().toLowerCase();
  }

  // getCommandeCredit(){
  //   this.$ok = this.route.paramMap.pipe(
  //     switchMap((params: ParamMap) =>
  //       this.clientService.periode(params.get('periode')), 
  //     ),
  //   );

  //   this.$commandesCredit = this.route.paramMap.pipe(
  //     switchMap((params: ParamMap) =>
  //       this.clientService.commandeCredit(params.get('periode')), 
  //     ),
  //   );
    
  //   this.$commandesCredit.subscribe((resuts: Client[]) => {
  //     this.clients = new MatTableDataSource(resuts);      
  //       this.clients.paginator = this.paginator;
  //       this.clients.sort = this.sort;
      
  //   })  
  // }


  getCommandeCredit(){
    let date = new Date();
    this.clientService.allClientCommande().subscribe((resuts: Client[]) => {
        this.clients.paginator = this.paginator;
        this.clients.sort = this.sort;
        
        if(this.route.snapshot.paramMap.get('periode') == 'today')
        {
          var resultats = resuts.filter(function(result){
        console.log('RESULT', result.commandes.length);

            if(result.deteCmdUpdate){
              var deteCmdUpdate = new Date(result.deteCmdUpdate);
              return result.commandes.length > 0 && deteCmdUpdate.getDate() == date.getDate() && deteCmdUpdate.getMonth() == date.getMonth() && deteCmdUpdate.getFullYear() == date.getFullYear();
            }
            
          }) 
        }

        if(this.route.snapshot.paramMap.get('periode') == 'month')
        {
          var resultats = resuts.filter(function(result){
            if(result.deteCmdUpdate){
              var deteCmdUpdate = new Date(result.deteCmdUpdate);
              return deteCmdUpdate.getMonth() == date.getMonth() && deteCmdUpdate.getFullYear() == date.getFullYear();
            }
            
          }) 
        }

        if(this.route.snapshot.paramMap.get('periode') == 'year')
        {
          var resultats = resuts.filter(function(result){
            if(result.deteCmdUpdate){
              var deteCmdUpdate = new Date(result.deteCmdUpdate);
              return deteCmdUpdate.getFullYear() == date.getFullYear();
            }
            
          }) 
        }

        if(this.route.snapshot.paramMap.get('periode') == 'all')
        {
          var resultats = resuts.filter(function(result){
            if(result.deteCmdUpdate){
              return resuts;
            }
            
          }) 
        }

      this.clients = new MatTableDataSource(resultats);      

    });
  }

  typeCmd(typeCmd){
    if(typeCmd == 'OM'){
      return 'assets/user/img/logo/om1.jpg';
    }else if(typeCmd == 'MoMo'){
      return 'assets/user/img/logo/momo.jpg';
    }else if(typeCmd == 'ST'){
      return 'assets/user/img/logo/images.jpg';
    }else if(typeCmd == 'Transfert'){
      return 'assets/user/img/logo/transfert.png';
    }
  }

  onCommande(id, periode){
    this.clientService.detaille(id).subscribe(res => {
      this.client = res;
      if(this.client.commandes.length > 0){
        this.router.navigate(['client/commandes/commande-credit-detaill', id, periode])
      }else{
        this.snackBar.openSnackBar("Cet client n'a pas effectuer des commandes!!!", 'Fermer')
      }
    })  
  }

}
