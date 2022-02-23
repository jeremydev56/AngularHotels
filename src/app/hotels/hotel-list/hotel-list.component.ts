// Importer les métadonnées : Component, OnInit
import { Component, OnInit } from "@angular/core";
// import de l'interface
import { IHotel } from "../shared/models/hotel";
import { HotelListService } from "../shared/services/hotel-list.service";

/*
  Le component se compose :
  - du selector, nom du dossier
  - du templateUrl en HTML
  */
@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})

export class HotelListComponent implements OnInit{
  // OnInit = initialiser le component
  // implements OnInit : implémenter l'interface

  public title = "List of hotels";

  // On crée un tableau d'hôtels
  public hotels: any[] = [
    {
      "hotelId": 1,
      "hotelName": "GEM Hotel Chelsea",
      "hotelDescription": "The Nicest Front Desk Operator of Chelsea !",
      "hotelPrice": 200,
      "hotelPicture" : "assets/pictures/GEMHotel.jpg",
      "rating": 5
    },
    {
      "hotelId": 2,
      "hotelName": "Luma Hotel Times Square",
      "hotelDescription": "You'll be in the heart of Broadway !",
      "hotelPrice": 300,
      "hotelPicture" : "assets/pictures/LumaHotelTimesSquare.png",
      "rating": 4.5
    },
    {
      "hotelId": 3,
      "hotelName": "Merrion Row Hotel and Public House",
      "hotelDescription": "The most typical hotel of New York City !",
      "hotelPrice": 350,
      "hotelPicture" : "assets/pictures/MerrionRowHotel.png",
      "rating": 4
    },
    {
      "hotelId": 4,
      "hotelName": "Pendry Manhattan West",
      "hotelDescription": "A fine taste of sweetness and beauty : the spirit of Big Apple !",
      "hotelPrice": 500,
      "hotelPicture" : "assets/pictures/PendryManhattanWest.png",
      "rating": 3.5
    },
    {
      "hotelId": 5,
      "hotelName": "The Chatwal",
      "hotelDescription": "Delightful ! Wonderful !",
      "hotelPrice": 800,
      "hotelPicture" : "assets/pictures/TheChatwal.png",
      "rating": 4.5
    },
    {
      "hotelId": 6,
      "hotelName": "Equinox",
      "hotelDescription": "And i'm feeling good ...",
      "hotelPrice": 575,
      "hotelPicture" : "assets/pictures/Equinox.png",
      "rating": 4
    }
  ];

// Nouvelle propriété pour afficher le badge "New" (petit rectangle)
public showBadge: boolean | undefined;

// Nouvelle propriété pour filtrer un mot
private _hotelFilter = '';

// Nouvelle propriété pour filtrer le mot au sein des hôtels listés
public filteredHotels: IHotel[] = [];

// Nouvelle propriété
public receivedRating!: string;

public errMessage!: string;

// Constructeur => injecter la dépendance hotelListService et le type HotelListService
constructor(private hotelListService: HotelListService) {

}

// Méthode pour OnInit
ngOnInit() {
  //console.log('Called ngOnInit method');

  // passer l'observable plutôt qu'une liste
  this.hotelListService.getHotels().subscribe({
    next: hotels => {
    this.hotels = hotels,
    this.filteredHotels = this.hotels;
    },
    error: err => this.errMessage = err
    });
  /*
    .subscribe() = "souscrire" à l'observable
    à l'intérieur, on passe notre observable
    on prend ensuite, dans next,
    la liste des hôtels qui seront retournés
    puis on crée une fonction fléchée
    on passe la valeur this.hotels
    // IDEM POUR error

    Désormais, notre liste est appelée à partir d'une requête Http
  */

  this.hotelFilter = '';

  // console.log(this.hotels);
}

// Méthode affiliée à la propriété showBadge
public toggleIsNewBadge(): void{
  this.showBadge = !this.showBadge;
  // si le badge est affiché, ne renvoie rien
  // si le badge n'est pas affiché, renvoie la propriété showBadge
}

// GETTER = lecture
public get hotelFilter(): string{
  return this._hotelFilter;
}

//SETTER : écriture
public set hotelFilter(filter: string) {
  this._hotelFilter = filter;
  // si hotelFilter a une valeur, on filtre / sinon, on laisse la liste des hôtels
  this.filteredHotels = this.hotelFilter ? this.filterHotels(this.hotelFilter) : this.hotels;
}

// Liaison entre le TS et l'HTML
public receiveRatingClick(message: string): void{
  // affiche un message
  this.receivedRating = message;
}

// Nouvelle méthode pour filtrer le mot
private filterHotels(criteria: string): IHotel[]{
  // mettre le mot en minuscule
  criteria = criteria.toLocaleLowerCase();

  // nouvelle variable permettant de parcourir le tableau hotels
  const res = this.hotels.filter(
    // convertir le nom de l'hôtel en minuscules
    (hotel: IHotel) => hotel.hotelName.toLocaleLowerCase().indexOf(criteria) != -1
  );
  return res;
}

}
