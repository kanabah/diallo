import { Injectable } from '@angular/core';
import { ScriptStore, ScriptJs, ScriptStoreHome, ScriptJsDetaille, ScriptStoreAdmi } from './dynamic-loader.service';

@Injectable({
  providedIn: 'root'
})
export class JsService {

  constructor() { }

  jsHomeUser(){
    var js = document.querySelector('.js-ng')
    let res;
    // console.log('SRC', ScriptStoreHome.length);
    for(var i =0; i < ScriptStoreHome.length; i++)
    {
      res = ScriptStoreHome[i].src;
      if(res.indexOf('js') >= 0){
        // console.log('SRC', res);
        
        var script = document.createElement('script');
        script.setAttribute('src', res);
        js.appendChild(script);
      }
    }
  }

  jsAdmi(){
    var js = document.querySelector('.js-ng-admi')
    let res;
    // console.log('SRC', ScriptStoreHome.length);
    for(var i =0; i < ScriptStoreAdmi.length; i++)
    {
      res = ScriptStoreAdmi[i].src;
      if(res.indexOf('js') >= 0){
        // console.log('SRC', res);
        
        var script = document.createElement('script');
        script.setAttribute('src', res);
        js.appendChild(script);
      }
    }
  }

  jsAdmiTitle(){
    var js = document.querySelector('.js-ng-admi-title')
    let res;
    // console.log('SRC', ScriptStoreHome.length);
    for(var i =0; i < ScriptStoreAdmi.length; i++)
    {
      res = ScriptStoreAdmi[i].src;
      if(res.indexOf('js') >= 0){
        // console.log('SRC', res);
        
        var script = document.createElement('script');
        script.setAttribute('src', res);
        js.appendChild(script);
      }
    }
  }

  jsHeaderUser(){
    var js = document.querySelector('.js-ng-header')
    let res;
    // console.log('SRC', ScriptJs.length);
    for(var i =0; i < ScriptJs.length; i++)
    {
      res = ScriptJs[i].src;
      if(res.indexOf('js') >= 0){
        // console.log('SRC', res);
        
        var script = document.createElement('script');
        script.setAttribute('src', res);
        js.appendChild(script);
      }
    }
  }

  jsDeatilleClient(){
    var js = document.querySelector('.js-detaille-client')
    let res;
    // console.log('SRC', ScriptJs.length);
    for(var i =0; i < ScriptJsDetaille.length; i++)
    {
      res = ScriptJsDetaille[i].src;
      if(res.indexOf('js') >= 0){
        // console.log('SRC', res);
        
        var script = document.createElement('script');
        script.setAttribute('src', res);
        js.appendChild(script);
      }
    }
  }
}
