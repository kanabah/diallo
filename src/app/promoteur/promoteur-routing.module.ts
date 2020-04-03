import { ListEntrerCaisseComponent } from './list-entrer-caisse/list-entrer-caisse.component';
import { SortieCaisseComponent } from './sortie-caisse/sortie-caisse.component';
import { AuthGuard } from './../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntrerCaisseComponent } from './entrer-caisse/entrer-caisse.component';


const routes: Routes = [
  {
    path: 'promoteur',
    canActivate: [AuthGuard],
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromoteurRoutingModule { }
