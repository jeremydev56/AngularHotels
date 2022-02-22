import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';

import { AppComponent } from './app.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { StarRatingComponent } from './shared/components/star-rating/star-rating.component';
import { HomeComponent } from './home/home.component';
import { HotelDetailComponent } from './hotel-list/hotel-detail/hotel-detail.component';

// mettre la langue de l'app en anglais (américain => en-US)
registerLocaleData(localeEn, 'en-US');

@NgModule({
  declarations: [
    // ENREGISTRER LES COMPONENTS PRÉSENTS DANS L'APPLICATION
    AppComponent,
    HotelListComponent,
    StarRatingComponent,
    HomeComponent,
    HotelDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // import du service Angular spécialisé en routage !!!
    RouterModule.forRoot([
      // si l'url se termine par home => direction le HomeComponent
      { path: 'home', component: HomeComponent },
      // si l'url se termine par du vide => redirection vers le HomeComponent
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      // si l'url se termine par hotels/:id => direction le HotelDetailComponent
      { path: 'hotels/:id', component: HotelDetailComponent },
      // si l'url se termine par hotels => direction le HotelListCompoentn
      { path: 'hotels', component: HotelListComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
