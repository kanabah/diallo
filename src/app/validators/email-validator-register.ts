import { UserService } from '../services/user.service';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function emailValidatorRegister(userServive: UserService, route): AsyncValidatorFn{
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userServive.emailExist(control.value).pipe(
       map(user => {
           if(route === 'register'){
               if(user.length > 0){
                   return {'emailExist': true}
                }else{
                    return null;
                }
            }else if(route === 'login'){
                if(user.length > 0){
                    if(user[0].active == 1){
                        return null;
                    }else{
                        return {'emailExist': true}    
                    }
                }else{
                    return {'emailExist': true}
                }
            }
        })
    )
  }
}