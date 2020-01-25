import { ValidatorFn, AbstractControl } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function controlCodeTelValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        if(control.value.length > 0){
            const forbidden = nameRe.test(control.value);
            return forbidden ?  null : {'codeErr': {value: control.value}};
        }else{
            return null;
        }
    };
  }