// CECI EST UN MODULE POUR LE ROUTING DE TOUTE L'APPLICATION

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // import du service Angular spécialisé en routage !!!
    RouterModule.forRoot([
      // si l'url se termine par home => direction le HomeComponent
      { path: 'home', component: HomeComponent },
      // si l'url se termine par du vide => redirection vers le HomeComponent
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
