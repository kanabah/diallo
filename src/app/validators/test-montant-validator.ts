import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientService } from '../services/client.service';

export function testMontantValidator(clientService: ClientService, id): AsyncValidatorFn{
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return clientService.testMontantRelementCommande(control.value, id).pipe(
       map(commande => {
           if(control.value > commande.somRest || control.value == 0){
               return {"imposible": true};   
           }
        return null;
    })
    )
  }
}