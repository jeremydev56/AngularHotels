/*
INTERFACE :
définition d'une série de propriétés et de méthodes
une classe supportant cette définition en implémentant l'interface
utilisé comme types pour les propriétés et méthodes
*/

/* TOUJOURS UN I DEVANT LE NOM DE L'INTERFACE */
export interface IHotel {
  // définir le type de l'objet qui figure dans l'objet du tableau hotels
  id: number;
  hotelName: string;
  hotelDescription: string;
  price: number;
  hotelPicture: string;
  rating: number;
  tags?: string[];
}

export class Hotel implements IHotel {
  constructor(
    public id: number,
    public hotelName: string,
    public hotelDescription: string,
    public price: number,
    public hotelPicture: string,
    public rating: number,
    public tags?: string[]
  ) {}


  getNewPrice(price: number): number{
  return price - 5 ;
  }
}
