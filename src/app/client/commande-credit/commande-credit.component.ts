import { Client } from './../../interfaces/client';
import { PrintClientService } from './../../services/print-client.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from 'src/app/services/client.service';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { WeekService } from 'src/app/services/week.service';

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
  clientsAll: Client[] = [];
  myParams: any;
  periodeCmd: any;
  $commandesCredit: any;
  $ok: any;

  constructor(private router: Router, private snackBar: SnackBarService ,private route: ActivatedRoute, private clientService: ClientService, public print: PrintClientService, private weekEnd: WeekService) { }

  ngOnInit() {
    console.log('JE SUIS COOL');
    
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
  displayedColumns: string[] = ['avatar', 'nom', 'prenom', 'adress.commune', 'adress.quartier', 'adress.secteur', 'telOrange', 'telMtn', 'telCelcom', 'telPerso', 'genre', 'email', 'description','entreprise', '_id', 'nbCmd'];
    
  applyFilter(filterValue: string) {
    this.clients.filter = filterValue.trim().toLowerCase();
  }

  getCommandeCredit(){
    let date = new Date();
    this.clientService.allClientCommande().subscribe((resuts: Client[]) => {
      resuts.sort((a: any, b: any) => a.deteCmdUpdate < b.deteCmdUpdate ? 1 : a.deteCmdUpdate > b.deteCmdUpdate ? -1 : 0);
        this.clients.paginator = this.paginator;
        this.clients.sort = this.sort;
        this.clientsAll = resuts;

        if(this.route.snapshot.paramMap.get('periode') == 'today')
        {
          var resultats = resuts.filter(function(result){
            if(result.deteCmdUpdate){
              var deteCmdUpdate = new Date(result.deteCmdUpdate);
              return deteCmdUpdate.getDate() == date.getDate() && deteCmdUpdate.getMonth() == date.getMonth() && deteCmdUpdate.getFullYear() == date.getFullYear();
            }
          }) 
        }
        
        if(this.route.snapshot.paramMap.get('periode') == 'week')
        {
          var resultats = resuts.filter(function(result){
            if(result.deteCmdUpdate){
              var deteCmdUpdate = new Date(result.deteCmdUpdate);
              return deteCmdUpdate.getDate() == date.getDate() && deteCmdUpdate.getMonth() == date.getMonth() && deteCmdUpdate.getFullYear() == date.getFullYear();
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

  getCreditClient(id){
    var sumTotal = 0;
    var sumOM = 0;
    var sumMoMo = 0;
    var sumST = 0;
    var sumTransfert = 0;
    var date = new Date();

    var clis = this.clientsAll.filter(res => {
      return res._id == id
    });

    clis[0].commandes.forEach(res =>{
      var dateCmd = new Date(res.dateCmd);
      
      //RECUPERATION DES SOLDES CREDIT EFFECTUER DU JOUR
      if(this.route.snapshot.paramMap.get('periode') == 'today'){
        if(dateCmd.getDate() == date.getDate() && dateCmd.getMonth() == date.getMonth() && dateCmd.getFullYear() == date.getFullYear()){
          
          sumTotal +=res.somRest;
      
          if(res.typeCmd == 'OM'){
              sumOM +=res.somRest;
          }
    
          if(res.typeCmd == 'MoMo'){
              sumMoMo +=res.somRest;
          }
          if(res.typeCmd == 'ST'){
              sumST +=res.somRest;
          }
          if(res.typeCmd == 'Transfert'){
              sumTransfert +=res.somRest;
          }
        }
      }

      //RECUPERATION DES SOLDES CREDIT EFFECTUER DU MOIS
      if(this.route.snapshot.paramMap.get('periode') == 'month'){
        if(dateCmd.getMonth() == date.getMonth() && dateCmd.getFullYear() == date.getFullYear()){
          
          sumTotal +=res.somRest;
      
          if(res.typeCmd == 'OM'){
              sumOM +=res.somRest;
          }
    
          if(res.typeCmd == 'MoMo'){
              sumMoMo +=res.somRest;
          }
          if(res.typeCmd == 'ST'){
              sumST +=res.somRest;
          }
          if(res.typeCmd == 'Transfert'){
              sumTransfert +=res.somRest;
          }
        }
      }

      //RECUPERATION DES SOLDES CREDIT EFFECTUER DE L'ANNEE
      if(this.route.snapshot.paramMap.get('periode') == 'year'){
        if(dateCmd.getFullYear() == date.getFullYear()){
          
          sumTotal +=res.somRest;
      
          if(res.typeCmd == 'OM'){
              sumOM +=res.somRest;
          }
    
          if(res.typeCmd == 'MoMo'){
              sumMoMo +=res.somRest;
          }
          if(res.typeCmd == 'ST'){
              sumST +=res.somRest;
          }
          if(res.typeCmd == 'Transfert'){
              sumTransfert +=res.somRest;
          }
        }
      }

      //RECUPERATION DES SOLDES CREDIT EFFECTUER TOTAL
      if(this.route.snapshot.paramMap.get('periode') == 'all'){
          sumTotal +=res.somRest;
      
          if(res.typeCmd == 'OM'){
              sumOM +=res.somRest;
          }
    
          if(res.typeCmd == 'MoMo'){
              sumMoMo +=res.somRest;
          }
          if(res.typeCmd == 'ST'){
              sumST +=res.somRest;
          }
          if(res.typeCmd == 'Transfert'){
              sumTransfert +=res.somRest;
          }
      }
    
    });
  
    var resultats = {
        somRestOM: sumOM,
        somRestMoMo: sumMoMo,
        somRestST: sumST,
        somRestTransfert: sumTransfert,
        somRestTotal: sumTotal,
    }
    
   return resultats;
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
