import { Component, Input, OnChanges, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})

export class StarRatingComponent implements OnChanges{

  // Une propriété pour indiquer la taille de l'étoile
  public starWidth!: number;

  // @Input = pour envoyer des données, de l'élément parent à l'elément enfant
  @Input()

  // Une propriété pour indiquer le nombre d'étoiles correspondant
  public rating: number = 2;

  // @Output = pour envoyer des données, de l'élément enfant à l'elément parent
  @Output()
  // Une propriété pour faire la liaison entre l'élément parent et l'élement enfant
  public starRatingClicked: EventEmitter<string> = new EventEmitter<string>();

  // OnChanges : modifier la valeur de chaque icône
  ngOnChanges() {
    // Pour changer la valeur de chaque étoile
    this.starWidth = this.rating * 125 / 5 ;
    // on multiplie la taille de l'étoile par 125 (la taille du container) et divisé par 5 (le nombre d'étoiles)
  }

  // Méthode pour envoyer le nombre d'étoiles cliquées sur le HTML vers le TS
  public sendRating(): void {
    this.starRatingClicked.emit(`The note is ${this.rating}.`);
  }
}



