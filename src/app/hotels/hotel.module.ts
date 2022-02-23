import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelDetailComponent } from './hotel-list/hotel-detail/hotel-detail.component';
import { StarRatingComponent } from '../shared/components/star-rating/star-rating.component';
import { RouterModule } from '@angular/router';
import { HotelDetailGuard } from './shared/guards/hotel-detail.guard';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    // déclarer les deux modules
    HotelListComponent,
    HotelDetailComponent,
    StarRatingComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      // si l'url se termine par hotels/:id => direction le HotelDetailComponent
      { path: 'hotels/:id', component: HotelDetailComponent,
      // import du Guard canActivate
      canActivate: [HotelDetailGuard]
      },
      // si l'url se termine par hotels => direction le HotelListCompoentn
      { path: 'hotels', component: HotelListComponent },
    ]),
    SharedModule
  ]
})
export class HotelModule { }
