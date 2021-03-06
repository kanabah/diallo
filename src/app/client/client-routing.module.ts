import { AuthGuardGuichet } from './../guards/auth-guichet.guards';
import { AttributionListComponent } from './../promoteur/attribution-list/attribution-list.component';
import { ProductionPromoteurTotalComponent } from './../promoteur/production-promoteur-total/production-promoteur-total.component';
import { ProductionPromoteurPeriodeComponent } from './../promoteur/production-promoteur-periode/production-promoteur-periode.component';
import { AuthUserOrPromoteurGuard } from './../guards/auth-user-or-promoteur.guards';
import { ResultSerachClientByAgenceOrPromoteurComponent } from './result-serach-client-by-agence-or-promoteur/result-serach-client-by-agence-or-promoteur.component';
import { RaportGuichetPeriodeComponent } from './raport-guichet-periode/raport-guichet-periode.component';
import { UpdateTransactionComponent } from './update-transaction/update-transaction.component';
import { GuichetListUserComponent } from './guichet-list-user/guichet-list-user.component';
import { TransactionGuichetComponent } from './transaction-guichet/transaction-guichet.component';
import { AttributeEspeceComponent } from './attribute-espece/attribute-espece.component';
import { AuthGuard } from './../guards/auth.guard';
import { ListPromoteurComponent } from './list-promoteur/list-promoteur.component';
import { PeriodeCommandeDetailleComponent } from './periode-commande-detaille/periode-commande-detaille.component';
import { ReglementListComponent } from './reglement-list/reglement-list.component';
import { CommandeAllComponent } from './commande-all/commande-all.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AddClientComponent } from './add-client/add-client.component';
import { AllClientComponent } from './all-client/all-client.component';
import { DetailleClientComponent } from './detaille-client/detaille-client.component';
import { CommandeDetailComponent } from './commande-detail/commande-detail.component';
import { PeriodeCommandeComponent } from './periode-commande/periode-commande.component';
import { TypeAyementComponent } from './type-ayement/type-ayement.component';
import { CommandeCreditComponent } from './commande-credit/commande-credit.component';
import { CommandeCreditDettailleComponent } from './commande-credit-dettaille/commande-credit-dettaille.component';


const routes: Routes = [
  {
    path: 'promoteur',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'list',
        component:  ListPromoteurComponent,
      },
      {
        path: 'production-periode',
        component: ProductionPromoteurPeriodeComponent
      },
      {
        path: 'production/total/:id',
        component: ProductionPromoteurTotalComponent
      },
      {
        path: 'attribute-espece',
        component:  AttributeEspeceComponent,
      },
      {
        path: 'attribution-list/:id',
        component: AttributionListComponent
      }
    ]
  },
  {
    path: 'guichet',
    canActivate: [AuthGuardGuichet],
    children: [
      {
        path: 'transaction',
        component:  TransactionGuichetComponent,
      },
      {
        path: 'transaction/list/:type',
        component:  GuichetListUserComponent,
      },
      {
        path: 'transaction/raport/:periode',
        component: RaportGuichetPeriodeComponent,
      },
      {
        path: 'transaction/update/:id',
        component:  UpdateTransactionComponent,
      },
    ]
  },
  {
    path: 'client',
    children: [
      {
        path: 'add',
        canActivate: [AuthUserOrPromoteurGuard],
        component: AddClientComponent
      },
      {
        path: 'all',
        canActivate: [AuthUserOrPromoteurGuard],
        component: AllClientComponent
      },
      {
        path: 'all/detaille/:id',
        canActivate: [AuthUserOrPromoteurGuard],
        component: DetailleClientComponent
      },
      {
        path: 'result-serach-client-by-agence-or-promoteur/:id',
        canActivate: [AuthGuard],
        component: ResultSerachClientByAgenceOrPromoteurComponent
      },
      {
        path: 'commandes/all',
        canActivate: [AuthGuard],
        component: CommandeAllComponent
      },
      {
        path: 'commandes/TypePayement/:typePay',
        canActivate: [AuthGuard],
        component: TypeAyementComponent
      },
      {
        path: 'periodeCommande/:periode',
        canActivate: [AuthGuard],
        component: PeriodeCommandeComponent
      },
      {
        path: 'commandes/credit/:periode',
        canActivate: [AuthGuard],
        component: CommandeCreditComponent
      },
      {
        path: 'periodeCommande/detaille-commande/:id/:myParams',
        canActivate: [AuthGuard],
        component: PeriodeCommandeDetailleComponent
      },
      {
        path: 'commandes/commande-detaill/:id',
        canActivate: [AuthGuard],
        component: CommandeDetailComponent
      },
      {
        path: 'commandes/commande-credit-detaill/:id/:periode',
        canActivate: [AuthGuard],
        component: CommandeCreditDettailleComponent
      },
      {
        path: 'commandes/commande-detaill/reglement-list/:cmd_id/:client_id',
        canActivate: [AuthGuard],
        component: ReglementListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
