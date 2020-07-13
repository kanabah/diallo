import { AdmiModule } from './admi/admi.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PromoteurModule } from './promoteur/promoteur.module';
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
import { SharedModule } from './shared.module';
import { HeaderAdmiComponent } from './header-admi/header-admi.component';
import { GuideComponent } from './guide/guide.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";

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
    HeaderAdmiComponent,
    GuideComponent,
  ],
  entryComponents: [
    UpdatePasswordComponent
  ],
  imports: [
    BrowserModule,
    ClientModule,
    PromoteurModule,
    AdmiModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FontAwesomeModule,
    OrderModule,
    SharedModule,
    NgxSpinnerModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    NgxSpinnerService,
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
  bootstrap: [AppComponent],
  exports: [SearchBarComponent],
})
export class AppModule { }
