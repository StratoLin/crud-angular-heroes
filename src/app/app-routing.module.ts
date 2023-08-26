import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Componentes/main/main.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { LoginComponent } from './Componentes/login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { HeroesComponent } from './Componentes/heroes/heroes.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'main', component: MainComponent, ...canActivate(()=> redirectUnauthorizedTo(['/registro']))},
  { path: 'registro', component: RegistroComponent},
  { path: 'login', component: LoginComponent},
  { path: 'pagina-heroes', component: HeroesComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]  //para que se pueda usar en otros modulos
})
export class AppRoutingModule { }
