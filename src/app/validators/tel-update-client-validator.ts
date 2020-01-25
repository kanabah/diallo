import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientService } from '../services/client.service';
import { controlCodeTelValidator } from './tel-required-once-validator';

export function telUpdateClientValidator(clientService: ClientService, id): AsyncValidatorFn{
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if(control.value.length > 0){
      return clientService.telExist(control.value).pipe(
        map(client => {
            if(client.length > 0){
                if((client[0].telOrange == control.value || client[0].telMtn == control.value || client[0].telCelcom == control.value) && id == client[0]._id){
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