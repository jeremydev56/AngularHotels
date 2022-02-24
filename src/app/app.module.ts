import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HotelModule } from './hotels/hotel.module';

// mettre la langue de l'app en anglais (américain => en-US)
registerLocaleData(localeEn, 'en-US');

@NgModule({
  declarations: [
    // ENREGISTRER LES COMPONENTS PRÉSENTS DANS L'APPLICATION
    // LES COMPOSANTS N'APPARTIENNENT QU'À UN SEUL MODULE
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HotelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
