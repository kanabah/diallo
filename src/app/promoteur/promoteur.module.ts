import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PromoteurComponent } from './promoteur.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromoteurRoutingModule } from './promoteur-routing.module';
import { EntrerCaisseComponent } from './entrer-caisse/entrer-caisse.component';
import { SharedModule } from '../shared.module';
import { SortieCaisseComponent } from './sortie-caisse/sortie-caisse.component';
import { ListEntrerCaisseComponent } from './list-entrer-caisse/list-entrer-caisse.component';
import { DemoMaterialModule } from '../services/material.service';
import { UpdateCaissePromoteurComponent } from './update-caisse-promoteur/update-caisse-promoteur.component';
import { ListSortieCaisseComponent } from './list-sortie-caisse/list-sortie-caisse.component';
import { DialogDeleteCaisseComponent } from './dialog-delete-caisse/dialog-delete-caisse.component';
import { ListEntrerJourComponent } from './list-entrer-jour/list-entrer-jour.component';
import { ListSortieJourComponent } from './list-sortie-jour/list-sortie-jour.component';
import { ListDebitAgenceComponent } from './list-debit-agence/list-debit-agence.component';
import { ProductionPromoteurTotalComponent } from './production-promoteur-total/production-promoteur-total.component';
import { ProductionPromoteurPeriodeComponent } from './production-promoteur-periode/production-promoteur-periode.component';
import { AttributionListComponent } from './attribution-list/attribution-list.component';
import { AttributionUpdateComponent } from './attribution-update/attribution-update.component';
import { DeleteConfirmCoteAgenceComponent } from './delete-confirm-cote-agence/delete-confirm-cote-agence.component';
import { DepotAgenceComponent } from './depot-agence/depot-agence.component';
import { ListDepotAgenceComponent } from './list-depot-agence/list-depot-agence.component';
import { UpdateDepotAgenceComponent } from './update-depot-agence/update-depot-agence.component';


@NgModule({
  declarations: [PromoteurComponent, EntrerCaisseComponent, SortieCaisseComponent, ListEntrerCaisseComponent, UpdateCaissePromoteurComponent, ListSortieCaisseComponent, DialogDeleteCaisseComponent, ListEntrerJourComponent, ListSortieJourComponent, ListDebitAgenceComponent, ProductionPromoteurTotalComponent, ProductionPromoteurPeriodeComponent, AttributionListComponent, AttributionUpdateComponent, DeleteConfirmCoteAgenceComponent, DepotAgenceComponent, ListDepotAgenceComponent, UpdateDepotAgenceComponent],
  entryComponents: [
    DialogDeleteCaisseComponent,
    DeleteConfirmCoteAgenceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    PromoteurRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class PromoteurModule { }
