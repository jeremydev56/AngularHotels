import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHotel } from '../hotel';
import { HotelListService } from '../hotel-list.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  public hotel: IHotel = <IHotel>{};
  hotelListService: any;

  constructor(
    // injecter le service des routes qui sont activées
    private route: ActivatedRoute,
    // injecter le service des hôtels listés
    private hotelService: HotelListService
  ) { }

  ngOnInit(): void {
    // appeler le service implémenté plus haut
    const id = +this.route.snapshot.paramMap.get('id')!;
    /*
    + = transforme une chaîne de caractères en un nombre
    snapshot = valeur initiale
    paramMap = chercher les paramètres
    .get('id') : obtenir l'id de l'hôtel pour finir la route
    */

    this.hotelListService.getHotels().subscribe(
      (hotels: IHotel[]) => {
        this.hotel = hotels.find((hotel: IHotel) => hotel.id === id);
        console.log('hotel : ', this.hotel);
    })

  }

}
