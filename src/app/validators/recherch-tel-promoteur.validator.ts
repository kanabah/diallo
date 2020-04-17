import { UserService } from './../services/user.service';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export function recherchTelPromoteur(userService: UserService): AsyncValidatorFn{
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if(control.value.length > 0){
      return userService.telExistPromoteur(control.value).pipe(
        map(user => {
          if(user.length > 0){
            return {'client': {value: user[0]}};
          }else{
            return {'telNotExist': true};
          }
        })
        )
    }else{
      return of([]);
    }
  }
}