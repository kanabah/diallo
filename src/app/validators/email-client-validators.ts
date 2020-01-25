import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientService } from '../services/client.service';

export function emailValidatorClient(clientService: ClientService): AsyncValidatorFn{
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      if(control.value.length > 0){
        return clientService.emailExist(control.value).pipe(
            map(client => {
                if(client.length > 0){
                    return {'emailExist': true}
                }else{
                    return null;
                }
            })
            )
        }else{
            return of([]);
        }
    }
}