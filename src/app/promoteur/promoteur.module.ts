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


@NgModule({
  declarations: [PromoteurComponent, EntrerCaisseComponent, SortieCaisseComponent, ListEntrerCaisseComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PromoteurRoutingModule,
    SharedModule
  ]
})
export class PromoteurModule { }
