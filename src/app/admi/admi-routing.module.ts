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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmiRoutingModule { }
