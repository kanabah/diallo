import { PeriodeCommandeDetailleComponent } from './periode-commande-detaille/periode-commande-detaille.component';
import { ReglementListComponent } from './reglement-list/reglement-list.component';
import { CommandeAllComponent } from './commande-all/commande-all.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClientComponent } from './add-client/add-client.component';
import { AuthGuard } from '../guards/auth.guard';
import { AllClientComponent } from './all-client/all-client.component';
import { DetailleClientComponent } from './detaille-client/detaille-client.component';
import { CommandeDetailComponent } from './commande-detail/commande-detail.component';
import { PeriodeCommandeComponent } from './periode-commande/periode-commande.component';
import { TypeAyementComponent } from './type-ayement/type-ayement.component';
import { CommandeCreditComponent } from './commande-credit/commande-credit.component';
import { CommandeCreditDettailleComponent } from './commande-credit-dettaille/commande-credit-dettaille.component';


const routes: Routes = [
  {
    path: 'client',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'add',
        component: AddClientComponent
      },
      {
        path: 'all',
        component: AllClientComponent
      },
      {
        path: 'all/detaille/:id',
        component: DetailleClientComponent
      },
      {
        path: 'commandes/all',
        component: CommandeAllComponent
      },
      {
        path: 'commandes/TypePayement/:typePay',
        component: TypeAyementComponent
      },
      {
        path: 'periodeCommande/:periode',
        component: PeriodeCommandeComponent
      },
      {
        path: 'commandes/credit/:periode',
        component: CommandeCreditComponent
      },
      {
        path: 'periodeCommande/detaille-commande/:id/:myParams',
        component: PeriodeCommandeDetailleComponent
      },
      {
        path: 'commandes/commande-detaill/:id',
        component: CommandeDetailComponent
      },
      {
        path: 'commandes/commande-credit-detaill/:id/:periode',
        component: CommandeCreditDettailleComponent
      },
      {
        path: 'commandes/commande-detaill/reglement-list/:cmd_id/:client_id',
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
