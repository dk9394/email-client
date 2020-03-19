import { ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export class SyncValidators {
  static crossFieldsMatch(fieldName1: string, fieldName2: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors => {
      const val1 = control.value[fieldName1];
      const val2 = control.value[fieldName2];
      if (val1 !== val2) {
        return { passwordMatchFails: true };
      }

      return null;
    };
  }
}
