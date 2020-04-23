import { PromoteurService } from './../services/promoteur.service';
import { UserService } from './../services/user.service';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function testMontantSortiePromoteurValidator(userService: UserService, promoteurService: PromoteurService): AsyncValidatorFn{
    let resultFilterSoldActuel = 0 ;
    let promoteurs;
    let promoteurFilterEntrer;
    let promoteurFilterSortie;
    let someEntrer = 0;
    let someSortie = 0;
    let date = new Date();

  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    promoteurService.getPromoteurByUserId().subscribe(res => {
        promoteurs = res;
    });
    return userService.getUser(userService.getUserDetails()._id).pipe(
       map(user => {
            user.soldActuel.filter(function(res){
                var dateEntrerAgence = new Date(res.date);
                if(dateEntrerAgence.getDate() == date.getDate() && dateEntrerAgence.getMonth() == date.getMonth() && dateEntrerAgence.getFullYear() == date.getFullYear()){
                    resultFilterSoldActuel += res.montant; 
                }
            });

            promoteurFilterEntrer = promoteurs.filter(function(res){
                var dateEtrerPromoteur = new Date(res.createdAt);
                return res.type == 'entrer' && dateEtrerPromoteur.getDate() == date.getDate() && dateEtrerPromoteur.getMonth() == date.getMonth() && dateEtrerPromoteur.getFullYear() == date.getFullYear();
            })

            promoteurFilterSortie = promoteurs.filter(function(res){
                var dateEtrerPromoteur = new Date(res.createdAt);
                return res.type == 'sortie' &&  dateEtrerPromoteur.getDate() == date.getDate() && dateEtrerPromoteur.getMonth() == date.getMonth() && dateEtrerPromoteur.getFullYear() == date.getFullYear();
            })

            promoteurFilterEntrer.forEach(element => {
                someEntrer += element.montant      
            });

            promoteurFilterSortie.forEach(element => {
                someSortie += element.montant      
            });

            console.log('AFICHEEEEE', resultFilterSoldActuel);
            

            if(control.value > (someEntrer + resultFilterSoldActuel - someSortie) || control.value == 0){
                someSortie = 0;
                someEntrer = 0;
                resultFilterSoldActuel = 0;
                return {"imposible": true};   
            }

            someSortie = 0;
            someEntrer = 0;
            resultFilterSoldActuel = 0;
            
            return null;
        })
    )
  }
}