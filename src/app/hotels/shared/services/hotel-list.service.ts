/*
SERVICE : permettre d'importer les données concernant les hôtels
et libérer le component de cet effort
=> partager avec tous les component et sous-component
*/

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IHotel } from "../models/hotel";
import { Observable, throwError, of } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn:'root'
  // Root injector = disponible partout
})

export class HotelListService {

  // Déclaration de l'url de la requête
  private readonly HOTEL_API_URL = '/api/hotels';

  // Installation du constructeur dans notre service
  constructor(private http: HttpClient){}

  // Méthode pour récupérer la liste des hôtels au sein du service
  public getHotels(): Observable<IHotel[]>{
    return this.http.get<IHotel[]>(
      this.HOTEL_API_URL).pipe();
  }

  /*
  Méthode pour télécharger un hôtel en particulier
  avec en paramètre l'observable IHotel
  */
  public getHotelById(id: number): Observable<IHotel>{
    const url = `${this.HOTEL_API_URL}/${id}`
    if (id === 0){
      return of(this.getDefaultHotel());
    }
    return this.http.get<IHotel>(url).pipe(
      catchError(this.handleError)
    )
  }

  // Méthode pour créer un hôtel
  public createHotel(hotel: IHotel): Observable<IHotel> {
    hotel = {
      ...hotel,
      hotelPicture: 'assets/pictures/ThePlaza.jpg',
      id: number
    };
    return this.http.post<IHotel>(this.HOTEL_API_URL, hotel).pipe(
      catchError(this.handleError)
    )
  }

  // Méthode pour mettre à jour l'hôtel
  public updateHotel(hotel: IHotel): Observable<IHotel> {
    const url = `${this.HOTEL_API_URL}/${hotel.id}`;

    return this.http.put<IHotel>(url, hotel).pipe(
      catchError(this.handleError)
    );
  }

  // Méthode pour suprrimer l'hôtel
  public deleteHotel(id: number): Observable<{}> {
    const url = `${this.HOTEL_API_URL}/${id}`;

    return this.http.delete<IHotel>(url).pipe(
      catchError(this.handleError)
    );
  }

  private getDefaultHotel(): IHotel {
    return {
      id: 0,
      name: null,
      description: null,
      price: null,
      rating: null,
      imageUrl: null
    };
  }

  // Méthode ANGULAR pour attraper les erreurs
  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      errorMessage = "An error occured : ${error.error.message}";
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      errorMessage =
        `Backend returned code ${error.status},` +
        `body was: ${error.error}`;
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
