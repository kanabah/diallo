import { UserService } from 'src/app/services/user.service';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export function updateEmailUserValidator(userService: UserService, id): AsyncValidatorFn{
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if(control.value.length > 0){
      return userService.emailExist(control.value).pipe(
        map(user => {
            if(user.length > 0){
                if(user[0].email == control.value && id == user[0]._id){
                    return null;    
                }else{
                    return {'emailExist': true}
                }
            }
        })
    )
    }else{
      return of([]);
    }
  }
}