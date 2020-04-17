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


@NgModule({
  declarations: [AdmiComponent, ElementNotificationComponent, HomeAdmiComponent, NewUsersComponent, NavAdmiComponent, TitlePageComponent, ConfirmPasswordComponent, AttributeRoleComponent],
  entryComponents: [
    ConfirmPasswordComponent,
    AttributeRoleComponent
  ],
  imports: [
    CommonModule,
    AdmiRoutingModule,
    ReactiveFormsModule,
    DemoMaterialModule
  ]
})
export class AdmiModule { }
