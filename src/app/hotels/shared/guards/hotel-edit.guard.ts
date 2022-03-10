import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { HotelEditComponent } from '../../hotel-edit/hotel-edit.component';

@Injectable({
  providedIn: 'root'
})
export class HotelEditGuard implements CanDeactivate<HotelEditComponent> {

  canDeactivate(
    component: HotelEditComponent): boolean {
      if(component.hotelForm.dirty){
        // .dirty = pour retourner un élément du formulaire
        const hotelName = component.hotelForm.get('hotelName').value || 'New hotel';
        return confirm('Would you want to cancel changes on ${hotelName} ?');
      }
    return true;

  }

}
