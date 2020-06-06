import { timer, Observable } from 'rxjs';
import { UserService } from './user.service';
import { Injectable, Inject, Injector } from '@angular/core';
import { ScriptStore, ScriptStoreAdmi, ScriptNull } from './dynamic-loader.service';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private injector: Injector) { }
  
  public loadResources() {
    const userService = this.injector.get(UserService); 

    let res;
    
    console.log('USER LOGIN', userService.isLoggedIn());
    // timer(0, 5000).subscribe(resultat => {
      
      if(userService.isLoggedIn())
      {
        console.log('CONECTER');
        
        if(userService.getUserDetails().role != 'admi')
        {
          for(let result of ScriptStore ) {
            res = result.src;
            if( res.indexOf('css') >= 0 ) {
              this.loadCSS(res);
            }else if (res.indexOf('js') >= 0 ) {
              this.loadJS(res);
            }
          }
        }else{
          for(let result of ScriptStoreAdmi ) {
            res = result.src;
            if( res.indexOf('css') >= 0 ) {
              this.loadCSS(res);
            }else if (res.indexOf('js') >= 0 ) {
              this.loadJS(res);
            }
          }
        }
      }
      // else{
      //   for(let result of ScriptStore ) {
      //       res = result.src;
      //       if( res.indexOf('css') >= 0 ) {
      //         this.loadCSS(res);
      //       }else if (res.indexOf('js') >= 0 ) {
      //         this.loadJS(res);
      //       }
      //     }
      // }
    // })
      
  }

  public loadAdmi(){
    const userService = this.injector.get(UserService); 

    let res;
    
    for(let result of ScriptStoreAdmi ) {
      res = result.src;
      if( res.indexOf('css') >= 0 ) {
        this.loadCSS(res);
      }else if (res.indexOf('js') >= 0 ) {
        this.loadJS(res);
      }
    }
  }

  public loadUser(){
    const userService = this.injector.get(UserService); 

    let res;

    for(let result of ScriptStore ) {
      res = result.src;
      if( res.indexOf('css') >= 0 ) {
        this.loadCSS(res);
      }else if (res.indexOf('js') >= 0 ) {
        this.loadJS(res);
      }
    }
  }

  public loadNull(){
    const userService = this.injector.get(UserService); 

    let res;

    for(let result of ScriptNull ) {
      res = result.src;
      if( res.indexOf('css') >= 0 ) {
        this.loadCSS(res);
      }else if (res.indexOf('js') >= 0 ) {
        this.loadJS(res);
      }
    }
  }

  public loadCSS( resourcePath: string ) {
    const link = document.createElement( 'link' );
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = resourcePath;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  public loadJS( resourcePath: string ) {
    const link = document.createElement('script');
    link.type = 'application/javascript';
    // console.log('Resource Path', resourcePath);
    
    link.src =  resourcePath;
    document.querySelector('#footer-ng').appendChild(link);
  }
}
