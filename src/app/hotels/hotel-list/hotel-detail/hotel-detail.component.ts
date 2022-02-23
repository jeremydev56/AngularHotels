import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  public hotel: IHotel = <IHotel>{};

  constructor(
    // injecter le service des routes qui sont activées
    private route: ActivatedRoute,
    // Injecter le service qui s'occupe des routages entre pages
    private router: Router,
    // injecter le service des hôtels listés
    private hotelListService: HotelListService,
  ) { }

  ngOnInit(): void {
    // appeler le service implémenté plus haut
    const nullableId = this.route.snapshot.paramMap.get('id');
    /*
    + = transforme une chaîne de caractères en un nombre
    snapshot = valeur initiale
    paramMap = chercher les paramètres
    .get('id') : obtenir l'id de l'hôtel pour finir la route
    */

      if (nullableId == null) return;

      const stringId = nullableId;
      const id = parseInt(stringId);

          /*
          appeler la liste des hôtes via la méthode Javascript .find()
          pour chaque "hotel", cherche celui qui a dans l'id
          l'id sélectionné dans notre route
          et défini avec const id = parseInt(stringId);
          */
          this.hotelListService.getHotels().subscribe(
            (hotels: IHotel[]) => {
              this.hotel = hotels.find((hotel: IHotel) => hotel.id === id);
              console.log('hotel : ', this.hotel);
          }
        );
    }


    // Méthode pour basculer sur la liste principale, appelée en HTML
    public backToList(): void {
      /*
      appel de la méthode navigate pour naviguer entre les pages
      et passer en paramètre l'url que l'on veut pour revenir
      */
      this.router.navigate(['/hotels']);
    }
}
