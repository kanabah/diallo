import { UserService } from 'src/app/services/user.service';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export function updateTelUserValidator(userService: UserService, id): AsyncValidatorFn{
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if(control.value.length > 0){
      return userService.telExist(control.value).pipe(
        map(user => {
            if(user.length > 0){
                if(user[0].tel == control.value && id == user[0]._id){
                    return null;    
                }else{
                    return {'telExist': true}
                }
            }
        })
    )
    }else{
      return of([]);
    }
  }
}