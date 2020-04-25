import { UserService } from '../services/user.service';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function telAgenceValidator(userServive: UserService): AsyncValidatorFn{
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userServive.telExist(control.value).pipe(
       map(user => {
        if(user.length > 0){
            if(user[0].active == 1){
                return null;
            }else{
                return {'telExist': true}
            }
        }else{
            return {'telExist': true}
        }
    })
    )
  }
}