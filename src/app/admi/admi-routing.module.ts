import { VisitPromoteurForAgenceComponent } from './visit-promoteur-for-agence/visit-promoteur-for-agence.component';
import { VisitClientForAgenceComponent } from './visit-client-for-agence/visit-client-for-agence.component';
import { DetailsAgenceComponent } from './details-agence/details-agence.component';
import { DetailsClientComponent } from './details-client/details-client.component';
import { ListClientComponent } from './list-client/list-client.component';
import { GuichetByCodeComponent } from './guichet-by-code/guichet-by-code.component';
import { ProductionPromoteurByDateComponent } from './production-promoteur-by-date/production-promoteur-by-date.component';
import { ListDebitPromoteurAdmiComponent } from './list-debit-promoteur-admi/list-debit-promoteur-admi.component';
import { ProductionPromoteurAdmiComponent } from './production-promoteur-admi/production-promoteur-admi.component';
import { PromoteurListComponent } from './promoteur-list/promoteur-list.component';
import { GuichetByAgenceComponent } from './guichet-by-agence/guichet-by-agence.component';
import { CommandeRechercheByClientComponent } from './commande-recherche-by-client/commande-recherche-by-client.component';
import { CommandesListAdmiComponent } from './commandes-list-admi/commandes-list-admi.component';
import { ListGuichetProductionAgenceComponent } from './list-guichet-production-agence/list-guichet-production-agence.component';
import { UpdateGuichetComponent } from './update-guichet/update-guichet.component';
import { GuichetListComponent } from './guichet-list/guichet-list.component';
import { AddGuichetsComponent } from './add-guichets/add-guichets.component';
import { NewUsersComponent } from './new-users/new-users.component';
import { ElementNotificationComponent } from './element-notification/element-notification.component';
import { AuthGuard } from './../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdmiComponent } from './home-admi/home-admi.component';
import { CommandesDetailleAdmiComponent } from './commandes-detaille-admi/commandes-detaille-admi.component';
import { RechercheCommandeByAgenceComponent } from './recherche-commande-by-agence/recherche-commande-by-agence.component';


const routes: Routes = [
  {
    path: 'admi',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeAdmiComponent
      },
      {
        path: 'elemennts-notification',
        component: ElementNotificationComponent,
      },
      {
        path: 'commande-recherche-by-agence',
        component: RechercheCommandeByAgenceComponent,
      },
      {
        path: 'commande-recherche-by-client',
        component: CommandeRechercheByClientComponent,
      },
      {
        path: 'elemennts-notification/new-users',
        component: NewUsersComponent
      },
      {
        path: 'guichet',
        component: AddGuichetsComponent
      },
      {
        path: 'guichet-by-code',
        component: GuichetByCodeComponent
      },
      {
        path: 'list-client',
        component: ListClientComponent
      },
      {
        path: 'visit-client-for-agence/:id',
        component: VisitClientForAgenceComponent
      },
      {
        path: 'visit-promoteur-for-agence/:id',
        component: VisitPromoteurForAgenceComponent
      },
      {
        path: 'details-client/:id',
        component: DetailsClientComponent
      },
      {
        path: 'details-agence/:id',
        component: DetailsAgenceComponent
      },
      {
        path: 'promoteur-list',
        component: PromoteurListComponent
      },
      {
        path: 'production-promoteur-admi/:id',
        component: ProductionPromoteurAdmiComponent
      },
      {
        path: 'list-debit-promoteur-admi/:id',
        component: ListDebitPromoteurAdmiComponent
      },
      {
        path: 'production-promoteur-by-date',
        component: ProductionPromoteurByDateComponent
      },
      {
        path: 'guichet-list',
        component: GuichetListComponent
      },
      {
        path: 'guichet-by-agence',
        component: GuichetByAgenceComponent
      },
      {
        path: 'guichet-list/update/:id',
        component: UpdateGuichetComponent
      },
      {
        path: 'guichet-list-production/:type',
        component: ListGuichetProductionAgenceComponent
      },
      {
        path: 'commandes-list/total/:periode',
        component: CommandesListAdmiComponent
      },
      {
        path: 'commandes-list/total/details/:id/:periode',
        component: CommandesDetailleAdmiComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmiRoutingModule { }
