import { UpdateDepotAgenceComponent } from './update-depot-agence/update-depot-agence.component';
import { ListDepotAgenceComponent } from './list-depot-agence/list-depot-agence.component';
import { DepotAgenceComponent } from './depot-agence/depot-agence.component';
import { AttributionUpdateComponent } from './attribution-update/attribution-update.component';
import { AttributionListComponent } from './attribution-list/attribution-list.component';
import { ProductionPromoteurPeriodeComponent } from './production-promoteur-periode/production-promoteur-periode.component';
import { ProductionPromoteurTotalComponent } from './production-promoteur-total/production-promoteur-total.component';
import { ListDebitAgenceComponent } from './list-debit-agence/list-debit-agence.component';
import { ListSortieJourComponent } from './list-sortie-jour/list-sortie-jour.component';
import { ListEntrerJourComponent } from './list-entrer-jour/list-entrer-jour.component';
import { ListSortieCaisseComponent } from './list-sortie-caisse/list-sortie-caisse.component';
import { UpdateCaissePromoteurComponent } from './update-caisse-promoteur/update-caisse-promoteur.component';
import { ListEntrerCaisseComponent } from './list-entrer-caisse/list-entrer-caisse.component';
import { SortieCaisseComponent } from './sortie-caisse/sortie-caisse.component';
import { AuthGuard } from './../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntrerCaisseComponent } from './entrer-caisse/entrer-caisse.component';
import { AuthGuardPromoteur } from '../guards/auth-promoteur.guards';


const routes: Routes = [
  {
    path: 'promoteur',
    canActivate: [AuthGuardPromoteur],
    children: [
      {
        path: 'enter/checkout',
        component: EntrerCaisseComponent
      },
      {
        path: 'out/checkout',
        component: SortieCaisseComponent
      },
      {
        path: 'list/enter',
        component: ListEntrerCaisseComponent
      },
      {
        path: 'list/sortie',
        component: ListSortieCaisseComponent
      },
      {
        path: 'list/enterJour',
        component: ListEntrerJourComponent
      },
      {
        path: 'list/sortieJour',
        component: ListSortieJourComponent
      },
      {
        path: 'list/debit',
        component: ListDebitAgenceComponent
      },
      {
        path: 'depot-agence',
        component: DepotAgenceComponent
      },
      {
        path: 'list-depot-agence',
        component: ListDepotAgenceComponent
      },
      {
        path: 'update-depot-agence/:id',
        component: UpdateDepotAgenceComponent
      },
      {
        path: 'attribution-update/:id/:user_id',
        component: AttributionUpdateComponent
      },
      {
        path: 'list/caisses/update/:id',
        component: UpdateCaissePromoteurComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromoteurRoutingModule { }
