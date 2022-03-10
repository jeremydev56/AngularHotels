import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { IHotel } from '../models/hotel';

export class HotelData implements InMemoryDbService{

  // OPour retourner un objet ou un observable
  createDb(): Record<string, IHotel[]> {
    const hotels: IHotel[] = [
      {
        id: 1,
        hotelName: "GEM Hotel Chelsea",
        hotelDescription: "The Nicest Front Desk Operator of Chelsea !",
        price: 200,
        hotelPicture : "assets/pictures/GEMHotel.jpg",
        rating: 5,
        tags: ['New']
      },
      {
        id: 2,
        hotelName: "Luma Hotel Times Square",
        hotelDescription: "You'll be in the heart of Broadway !",
        price: 300,
        hotelPicture : "assets/pictures/LumaHotelTimesSquare.png",
        rating: 4.5,
        tags: ['New']
      },
      {
        id: 3,
        hotelName: "Merrion Row Hotel and Public House",
        hotelDescription: "The most typical hotel of New York City !",
        price: 350,
        hotelPicture : "assets/pictures/MerrionRowHotel.png",
        rating: 4,
        tags: ['New']
      },
      {
        id: 4,
        hotelName: "Pendry Manhattan West",
        hotelDescription: "A fine taste of sweetness and beauty : the spirit of Big Apple !",
        price: 500,
        hotelPicture : "assets/pictures/PendryManhattanWest.png",
        rating: 3.5,
        tags: ['New']
      },
      {
        id: 5,
        hotelName: "The Chatwal",
        hotelDescription: "Delightful ! Wonderful !",
        price: 800,
        hotelPicture : "assets/pictures/TheChatwal.png",
        rating: 4.5,
        tags: ['New']
      },
      {
        id: 6,
        hotelName: "Equinox",
        hotelDescription: "And i'm feeling good ...",
        price: 575,
        hotelPicture : "assets/pictures/Equinox.png",
        rating: 4,
        tags: ['New']
      }
    ];
    return { hotels }
  }

  // Méthode pour générer un identifiant pour chaque nouvel hôtel
  genId(hotels: IHotel[]): number {
    return hotels.length > 0 ? Math.max(...hotels.map(hotel => hotel.id)) + 1 : 1;
  }

}
