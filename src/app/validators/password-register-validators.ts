import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');

    return password && passwordConfirm && password.value === passwordConfirm.value ? null : {"errorPassword": true}
}