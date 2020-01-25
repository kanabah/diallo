import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientService } from '../services/client.service';

export function emailUpdateClientValidator(clientService: ClientService, id): AsyncValidatorFn{
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      if(control.value.length > 0){
        return clientService.emailExist(control.value).pipe(
            map(client => {
                if(client.length > 0){
                    if(client[0].email == control.value && id == client[0]._id){
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