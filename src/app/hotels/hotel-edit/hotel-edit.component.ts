import { ParseTreeResult } from '@angular/compiler';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  debounce,
  debounceTime,
  EMPTY,
  fromEvent,
  merge,
  Observable,
  timer
} from 'rxjs';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';
import { GenericGlobalValidator } from '../shared/validators/generic-global.validator';
import { NumberValidators } from '../shared/validators/numbers.validator';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit, AfterViewInit {
  // @ViewChildren : avoir accès à tous les éléments

  @ViewChildren(FormControlName, { read: ElementRef })
  inputElements: ElementRef[] = [];

  // propriété pour le formulaire
  public hotelForm!: FormGroup;
  // Variable pour sauvegarder l'hôtel sélectionné
  public hotel!: IHotel;
  public pageTitle!: string;
  // propriété pour afficher un message d'erreur
  public errorMessage: string | null | undefined;
  // propriété pour sauvegarder l'ensemble des erreurs correspondant à chaque élément
  public formErrors: { [key: string]: string } = {};

  // Propriété pour afficher un message de validation
  private validationMessages: { [key: string]: { [key: string]: string } } = {
    hotelName: {
      required: 'The name of the hotel is required.',
      minlength: 'The name of the hotel must contain at least 8 characters.'
    },
    price: {
      required: 'The price of the hotel is required.',
      pattern: 'The price must be a number.'
    },
    rating: {
      range: 'The rating must be between 1 and 5 included.'
    }
  };

  private genericGlobalValidator!: GenericGlobalValidator;
  private isFormSubmitted!: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private hotelService: HotelListService,
    private router: Router
  ) {}

  // ngOnInit() = responsable de l'initialisation des templates
  ngOnInit(): void {
    // Pour faire passer les messages de validation
    this.genericGlobalValidator = new GenericGlobalValidator(
      this.validationMessages
    );
    // Méthode pour le formulaire
    // fb.group() = regroupe les éléments dans un formulaire
    this.hotelForm = this.fb.group({
      // construction du formulaire
      hotelName: ['', [Validators.required, Validators.minLength(4)]],
      price: [
        '',
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
      ],
      rating: ['', NumberValidators.range(1, 5)],
      description: ['']
    });

    this.formErrors = this.genericGlobalValidator.createErrorMessages(
      this.hotelForm
    );

    /*
    appel de this.route
    et souscrire à paramMap
    avec les params comme valeur
    au sein desquels je vais chercher
    l'id avec .get('id')
    */
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      // Pour convertir le string en number
      if (id == null) return;
      const stringId = id;
      const parseId = parseInt(stringId);
      // console.log(parseId);

      this.getSelectedHotel(parseId);
    });
  }

  ngAfterViewInit() {
    // without RxJS => changeDetection Error
    // this.formErrors = this.globalGenericValidator.createErrorMessages(this.hotelForm);

    this.validateForm();
  }

  // Méthode pour cacher le message d'erreur
  public hideErrorMessage(): void {
    this.errorMessage = null;
  }

  // Méthode pour récupérer un hôtel selon l'id
  public getSelectedHotel(id: number): void {
    // appel de la méthode getHotelById
    this.hotelService.getHotelById(id).subscribe((hotel: IHotel) => {
      this.displayHotel(hotel);
    });
  }

  // Méthode pour afficher les hôtels
  public displayHotel(hotel: IHotel): void {
    if (this.hotel !== undefined) {
      // après le narrowing, hotel est de type IHotel seulement, car on a vérifié qu'il n'est pas undefined
      this.hotel = hotel;
    }

    if (this.hotel.id === 0) {
      this.pageTitle = 'Create an hotel';
    } else {
      this.pageTitle = 'Modify the hotel ${this.hotel.hotelName}';
    }

    // paramètre = IHotel
    this.hotelForm.patchValue({
      // patchValue = appeler différentes valeurs au sein du formulaire
      hotelName: this.hotel.hotelName,
      price: this.hotel.price,
      rating: this.hotel.rating,
      description: this.hotel.hotelDescription
    });
    this.hotelForm.setControl('tags', this.fb.array(this.hotel.tags || []));
  }

  // Pour agir sur le formArray
  public get tags(): FormArray {
    return this.hotelForm.get('tags') as FormArray;
  }

  public addTag(): void {
    this.tags.push(new FormControl());
  }

  public deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  // Méthode pour sauvegarder les données
  public saveHotel(): void {
    this.isFormSubmitted = true;

    this.hotelForm.updateValueAndValidity({
      onlySelf: true,
      emitEvent: true
    });

    if (this.hotelForm.valid) {
      if (this.hotelForm.dirty) {
        const hotel: IHotel = {
          ...this.hotel,
          ...this.hotelForm.value
        };

        // add or edit logic
        if (hotel.id === 0) {
          this.hotelService.createHotel(hotel).subscribe({
            next: () => this.saveCompleted(),
            error: (err) => (this.errorMessage = err)
          });
        } else {
          this.hotelService.updateHotel(hotel).subscribe({
            next: () => this.saveCompleted(),
            error: (err) => (this.errorMessage = err)
          });
        }
      } else {
        this.saveCompleted();
      }
    } else {
      this.errorMessage = `Please, correct the errors.`;
    }
  }

  // Méthode pour supprimer un hôtel
  public deleteHotel(): void {
    if (this.hotel.id === 0) {
      this.saveCompleted();
    } else {
      if (confirm(`Are you sure to delete ${this.hotel.hotelName} ?`)) {
        this.hotelService.deleteHotel(this.hotel.id).subscribe({
          next: () => this.saveCompleted(),
          error: (err) => (this.errorMessage = err)
        });
      }
    }
  }

  // Méthode pour réinitialiser le formulaire
  public saveCompleted(): void {
    this.hotelForm.reset();
    this.router.navigate(['/hotels']);
  }

  public validateForm(): void {
    const formControlBlurs: Observable<unknown>[] = this.inputElements.map(
      (formControlElemRef: ElementRef) =>
        fromEvent(formControlElemRef.nativeElement, 'blur')
    );

    merge(this.hotelForm.valueChanges, ...formControlBlurs)
      .pipe(
        // debounceTime(300)
        debounce(() => (this.isFormSubmitted ? EMPTY : timer(300)))
      )
      .subscribe(() => {
        this.formErrors = this.genericGlobalValidator.createErrorMessages(
          this.hotelForm,
          this.isFormSubmitted
        );
        console.log('value on subscribe errors: ', this.formErrors);
      });
  }
}
