import { FormGroup } from "@angular/forms";

export class GenericGlobalValidator {
  constructor(
    private validationMessages: { [key: string]: { [key: string]: string } }
  ) { }

  public createErrorMessages(container: FormGroup, isFormSubmitted?: boolean): { [key: string]: string } {
    const errorMessages = {};

    for(const controlName in container.controls) {
      if(container.controls.hasOwnProperty(controlName)){
        const selectedControl = container.controls[controlName];

        if (this.validationMessages[controlName]) {

          errorMessages[controlName] = '';

          if((selectedControl.dirty || selectedControl.touched || isFormSubmitted) && selectedControl.errors) {
            Object.keys(selectedControl.errors).map((errorMessageKey: string) => {
              if (this.validationMessages[controlName][errorMessageKey]) {
                errorMessages[controlName] += this.validationMessages[controlName][errorMessageKey] + ' ';
              }
            });
          }
        }
      }
    } return errorMessages;
}

