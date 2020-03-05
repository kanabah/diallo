import { OrderModule } from 'ngx-order-pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ResourcesService } from './services/resources.service';
import { ResourceProviderFactory } from './services/ResourceProviderFactory';
import { HeaderUserComponent } from './header-user/header-user.component';
import { FooterUserComponent } from './footer-user/footer-user.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { GlobalErrorComponent } from './global-error/global-error.component';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceport';
import { ClientModule } from './client/client.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './services/material.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderUserComponent,
    FooterUserComponent,
    HomeUserComponent,
    GlobalErrorComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    MyProfileComponent,
    UpdatePasswordComponent,
  ],
  entryComponents: [
    UpdatePasswordComponent
  ],
  imports: [
    BrowserModule,
    ClientModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FontAwesomeModule,
    OrderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    ResourcesService,
    {
      provide: APP_INITIALIZER,
      useFactory: ResourceProviderFactory,
      deps: [ ResourcesService ],
      multi: true
    },
    GlobalErrorHandlerService,
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
