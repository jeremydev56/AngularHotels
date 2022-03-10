// CECI EST UN MODULE POUR LE ROUTING DES HÔTELS

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HotelDetailComponent } from './hotel-list/hotel-detail/hotel-detail.component';
import { HotelDetailGuard } from './shared/guards/hotel-detail.guard';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { HotelEditGuard } from './shared/guards/hotel-edit.guard';




@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      // si l'url se termine par hotels/:id => direction le HotelDetailComponent
      { path: 'hotels/:id', component: HotelDetailComponent,
      // import du Guard canActivate
      canActivate: [HotelDetailGuard]
      },
      // si l'url se termine par hotels => direction le HotelListCompoentn
      { path: 'hotels', component: HotelListComponent },
      // pour éditer un hôtel
      { path: 'hotels/:id/edit', component: HotelEditComponent, canDeactivate:[HotelEditGuard] },
    ]),
  ],
  exports: [RouterModule]
})
export class HotelRoutingModule { }
