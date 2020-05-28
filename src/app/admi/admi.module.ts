import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmiRoutingModule } from './admi-routing.module';
import { AdmiComponent } from './admi.component';
import { ElementNotificationComponent } from './element-notification/element-notification.component';
import { HomeAdmiComponent } from './home-admi/home-admi.component';
import { NewUsersComponent } from './new-users/new-users.component';
import { DemoMaterialModule } from '../services/material.service';
import { NavAdmiComponent } from './nav-admi/nav-admi.component';
import { TitlePageComponent } from './title-page/title-page.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { AttributeRoleComponent } from './attribute-role/attribute-role.component';
import { FooterAdmiComponent } from './footer-admi/footer-admi.component';
import { AddGuichetsComponent } from './add-guichets/add-guichets.component';
import { GuichetListComponent } from './guichet-list/guichet-list.component';
import { UpdateGuichetComponent } from './update-guichet/update-guichet.component';
import { ListGuichetProductionAgenceComponent } from './list-guichet-production-agence/list-guichet-production-agence.component';
import { CommandesListAdmiComponent } from './commandes-list-admi/commandes-list-admi.component';
import { CommandesDetailleAdmiComponent } from './commandes-detaille-admi/commandes-detaille-admi.component';
import { RechercheCommandeByAgenceComponent } from './recherche-commande-by-agence/recherche-commande-by-agence.component';
import { CommandeRechercheByClientComponent } from './commande-recherche-by-client/commande-recherche-by-client.component';
import { GuichetByAgenceComponent } from './guichet-by-agence/guichet-by-agence.component';
import { PromoteurListComponent } from './promoteur-list/promoteur-list.component';
import { ProductionPromoteurAdmiComponent } from './production-promoteur-admi/production-promoteur-admi.component';
import { ListDebitPromoteurAdmiComponent } from './list-debit-promoteur-admi/list-debit-promoteur-admi.component';
import { ProductionPromoteurByDateComponent } from './production-promoteur-by-date/production-promoteur-by-date.component';
import { GuichetByCodeComponent } from './guichet-by-code/guichet-by-code.component';
import { ListClientComponent } from './list-client/list-client.component';
import { DetailsClientComponent } from './details-client/details-client.component';
import { DetailsAgenceComponent } from './details-agence/details-agence.component';
import { VisitClientForAgenceComponent } from './visit-client-for-agence/visit-client-for-agence.component';
import { VisitPromoteurForAgenceComponent } from './visit-promoteur-for-agence/visit-promoteur-for-agence.component';
import { ResultRechercheClientByAdmiComponent } from './result-recherche-client-by-admi/result-recherche-client-by-admi.component';

@NgModule({
  declarations: [AdmiComponent, ElementNotificationComponent, HomeAdmiComponent, NewUsersComponent, NavAdmiComponent, TitlePageComponent, ConfirmPasswordComponent, AttributeRoleComponent, FooterAdmiComponent, AddGuichetsComponent, GuichetListComponent, UpdateGuichetComponent, ListGuichetProductionAgenceComponent, CommandesListAdmiComponent, CommandesDetailleAdmiComponent, RechercheCommandeByAgenceComponent, CommandeRechercheByClientComponent, GuichetByAgenceComponent, PromoteurListComponent, ProductionPromoteurAdmiComponent, ListDebitPromoteurAdmiComponent, ProductionPromoteurByDateComponent, GuichetByCodeComponent, ListClientComponent, DetailsClientComponent, DetailsAgenceComponent, VisitClientForAgenceComponent, VisitPromoteurForAgenceComponent, ResultRechercheClientByAdmiComponent],
  entryComponents: [
    ConfirmPasswordComponent,
    AttributeRoleComponent
  ],
  imports: [
    CommonModule,
    AdmiRoutingModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    NgxPaginationModule
  ]
})
export class AdmiModule { }
