// GUARD = protège la route (ici, 'hotels/id)

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelDetailGuard implements CanActivate {

  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      // Pour appeler l'url ... + convertir en nombre
      const id = + next.url[1].path;

      // si l'id est n'est pas un nimbre ou est inférieur à 0
      if (isNaN(id) || id < 0){
        // affiche ce message d'alerte
        alert("Here is an unknown hotel !");

        // passer l'url vers laquelle nous voulons aller
        this.router.navigate(['/hotels']);
        // canActivate n'aura aucune réaction sur notre route si cette condition est vérifiée
        return false;
      }
      // Valeur par défaut du Guard
      return true;
  }

}
