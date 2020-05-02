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
        path: 'elemennts-notification/new-users',
        component: NewUsersComponent
      },
      {
        path: 'guichet',
        component: AddGuichetsComponent
      },
      {
        path: 'guichet-list',
        component: GuichetListComponent
      },
      {
        path: 'guichet-list/update/:id',
        component: UpdateGuichetComponent
      },
      {
        path: 'guichet-list-production/:type',
        component: ListGuichetProductionAgenceComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmiRoutingModule { }
