import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ContractInformationComponent } from './contract-information/contract-information.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const readirectUnauthorizedToLogin = () => redirectUnauthorizedTo([''])
const redirectLoggedInToHome = () => redirectLoggedInTo(['home'])

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(readirectUnauthorizedToLogin)
  },
  {
    path: 'contract-information',
    component: ContractInformationComponent,
    ...canActivate(readirectUnauthorizedToLogin)
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    ...canActivate(readirectUnauthorizedToLogin)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
