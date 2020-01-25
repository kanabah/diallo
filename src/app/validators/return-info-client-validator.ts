import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientService } from '../services/client.service';

export function returnInfoClientValidator(clientService: ClientService): AsyncValidatorFn{
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if(control.value.length > 0){
      return clientService.telExist(control.value).pipe(
        map(client => {
          if(client.length > 0){
            return {'client': {value: client[0]}};
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