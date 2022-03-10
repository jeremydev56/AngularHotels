import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelDetailComponent } from './hotel-list/hotel-detail/hotel-detail.component';
import { StarRatingComponent } from '../shared/components/star-rating/star-rating.component';
import { HotelData } from './shared/api/hotel.data';



@NgModule({
  declarations: [
    // déclarer les deux modules
    HotelListComponent,
    HotelDetailComponent,
    StarRatingComponent
  ],
  imports: [
    SharedModule,
    InMemoryWebApiModule.forFeature(HotelData)
  ]
})

export class HotelModule { }
