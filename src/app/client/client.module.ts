import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { AddClientComponent } from './add-client/add-client.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../services/material.service';
import { AllClientComponent } from './all-client/all-client.component';
import { DetailleClientComponent } from './detaille-client/detaille-client.component';
import { DialogContentAddCommandeOrangeMoneyComponent } from './dialog-content-add-commande-orange-money/dialog-content-add-commande-orange-money.component';
import { DialogContentAddCommandeMobileMoneyComponent } from './dialog-content-add-commande-mobile-money/dialog-content-add-commande-mobile-money.component';
import { CommandeAllComponent } from './commande-all/commande-all.component';
import { CommandeDetailComponent } from './commande-detail/commande-detail.component';
import { OrderModule } from 'ngx-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { DialogReglementComponent } from './dialog-reglement/dialog-reglement.component';
import { DialogDeleteCommandeComponent } from './dialog-delete-commande/dialog-delete-commande.component';
import { ReglementListComponent } from './reglement-list/reglement-list.component';
import { DeleteReglementComponent } from './delete-reglement/delete-reglement.component';
import { UpdateCommandeComponent } from './update-commande/update-commande.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogContentAddTransfertComponent } from './dialog-content-add-transfert/dialog-content-add-transfert.component';
import { DialogContentAddStartTimesComponent } from './dialog-content-add-start-times/dialog-content-add-start-times.component';
import { PeriodeCommandeComponent } from './periode-commande/periode-commande.component';
import { PeriodeCommandeDetailleComponent } from './periode-commande-detaille/periode-commande-detaille.component';
import { TypeAyementComponent } from './type-ayement/type-ayement.component';
import { CommandeCreditComponent } from './commande-credit/commande-credit.component';
import { CommandeCreditDettailleComponent } from './commande-credit-dettaille/commande-credit-dettaille.component';
import { SharedModule } from '../shared.module';
import { ListPromoteurComponent } from './list-promoteur/list-promoteur.component';
import { AttributeEspeceComponent } from './attribute-espece/attribute-espece.component';
import { TransactionGuichetComponent } from './transaction-guichet/transaction-guichet.component';
import { GuichetListUserComponent } from './guichet-list-user/guichet-list-user.component';
import { UpdateTransactionComponent } from './update-transaction/update-transaction.component';
import { DeleteCoterUserComponent } from './delete-coter-user/delete-coter-user.component';
import { RaportGuichetPeriodeComponent } from './raport-guichet-periode/raport-guichet-periode.component';

@NgModule({
  declarations: [ClientComponent, AddClientComponent, AllClientComponent, DetailleClientComponent, DialogContentAddCommandeOrangeMoneyComponent, DialogContentAddCommandeMobileMoneyComponent, CommandeAllComponent, CommandeDetailComponent, DialogReglementComponent, DialogDeleteCommandeComponent, ReglementListComponent, DeleteReglementComponent, UpdateCommandeComponent, DialogContentAddTransfertComponent, DialogContentAddStartTimesComponent, PeriodeCommandeComponent, PeriodeCommandeDetailleComponent, TypeAyementComponent, CommandeCreditComponent, CommandeCreditDettailleComponent, ListPromoteurComponent, AttributeEspeceComponent, TransactionGuichetComponent, GuichetListUserComponent, UpdateTransactionComponent, DeleteCoterUserComponent, RaportGuichetPeriodeComponent],
  entryComponents: [
    DialogContentAddCommandeOrangeMoneyComponent,
    DialogContentAddCommandeMobileMoneyComponent,
    DialogReglementComponent,
    DialogDeleteCommandeComponent,
    DeleteReglementComponent,
    UpdateCommandeComponent,
    DialogContentAddTransfertComponent,
    DialogContentAddStartTimesComponent,
    DeleteCoterUserComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    OrderModule,
    NgxPaginationModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [
        
  ]
})
export class ClientModule {
}
