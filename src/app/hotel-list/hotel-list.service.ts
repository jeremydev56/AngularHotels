/*
SERVICE : permettre d'importer les données concernant les hôtels
et libérer le component de cet effort
=> partager avec tous les component et sous-component
*/

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IHotel } from "./hotel";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn:'root'
  // Root injector = disponible partout
})

export class HotelListService {

  // Déclaration de l'url de la requête
  private readonly HOTEL_API_URL = '/api/hotels.json';

  // Installation du constructeur dans notre service
  constructor(private http: HttpClient){
  }

  // Méthode pour récupérer la liste des hôtels au sein du service
  public getHotels(): Observable<IHotel[]>{
    return this.http.get<IHotel[]>(
      // insertion de l'url de la requête
      this.HOTEL_API_URL
    ).pipe(
      // .pipe = ajouter les opérateurs

    );
  }


  // Méthode ANGULAR pour attraper les erreurs
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
