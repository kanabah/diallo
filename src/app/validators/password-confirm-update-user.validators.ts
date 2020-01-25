import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const passwordUpdateUserValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const passwordNew = control.get('passwordNew');
    const passwordConfirm = control.get('passwordConfirm');

    return passwordNew && passwordConfirm && passwordNew.value === passwordConfirm.value ? null : {"errorPassword": true}
}