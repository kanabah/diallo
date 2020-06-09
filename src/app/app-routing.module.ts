import { AuthUserOrPromoteurGuard } from './guards/auth-user-or-promoteur.guards';
import { AuthGuardAdmi } from './guards/auth-admi.guards';
import { GuideComponent } from './guide/guide.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeUserComponent } from './home-user/home-user.component';
import { GlobalErrorComponent } from './global-error/global-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';


const routes: Routes = [
  { path: 'home', component: HomeUserComponent, canActivate: [AuthUserOrPromoteurGuard]},
  { path: 'user/profile', component: MyProfileComponent},
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
  { path: 'register', component: RegisterComponent},
  { path: 'guide', canActivate: [AuthGuardAdmi], component: GuideComponent},
  { path: '', redirectTo: '/home',pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'error', component: GlobalErrorComponent},
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
