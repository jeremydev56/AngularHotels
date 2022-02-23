/*
INTERFACE :
définition d'une série de propriétés et de méthodes
une classe supportant cette définition en implémentant l'interface
utilisé comme types pour les propriétés et méthodes
*/

/* TOUJOURS UN I DEVANT LE NOM DE L'INTERFACE */
export interface IHotel {
  id: number;
  // définir le type de l'objet qui figure dans l'objet du tableau hotels
  hotelId: number;

  hotelName: string;

  hotelDescription: string;

  hotelPrice: number;

  hotelPicture: string;

  rating: number;
}
