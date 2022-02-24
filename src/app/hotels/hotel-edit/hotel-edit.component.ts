import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit {

  // propriété pour le formulaire
  public hotelForm!: FormGroup;

  constructor(private fb: FormBuilder) {
   }

  ngOnInit(): void {
    // Méthode pour le formulaire
    // fb.group() = regroupe les éléments dans un formulaire
    this.hotelForm = this.fb.group({
      // construction du formulaire
      hotelName: ['', Validators.required],
      hotelprice: ['', Validators.required],
      starRating: [''],
      description: [''],
    });
  }

  // Méthode pour sauvegarder les données
  public saveHotel(): void{
    console.log(this.hotelForm.value);
    // Dans la console, affiche les valeurs du formulaire

  }

}
