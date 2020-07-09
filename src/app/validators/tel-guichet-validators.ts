import { UserService } from './../services/user.service';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export function telGuichetValidator(userService: UserService): AsyncValidatorFn{
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if(control.value.length > 0){
      return userService.getUserByPhone(control.value).pipe(
        map(user => {
          if(user.length > 0){
              if(user[0].active == 1 && user[0].role == 'guichet'){
                  return {'user': {value: user[0]}};
              }else{
                return {'telNotExist': true};
              }
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