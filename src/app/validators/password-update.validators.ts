import { User } from './../interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export function passwordUpdate(userService: UserService): AsyncValidatorFn{
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if(control.value.length > 0){
    const userKana = {"email": userService.getUserDetails().email, "password": control.value};
      return userService.login(userKana).pipe(
        map(data => {
            if(data){
                console.log('Vraie', data);
                return null;    
            }else{
                console.log('FAUX', data);
                return {'passwordWrong': true}
            }
        })
    )
    }else{
      return of([]);
    }
  }
}