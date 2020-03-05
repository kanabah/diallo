import { JsService } from './../services/js.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScriptStore } from '../services/dynamic-loader.service';

@Component({
  selector: 'app-footer-user',
  templateUrl: './footer-user.component.html',
  styleUrls: ['./footer-user.component.css']
})
export class FooterUserComponent implements OnInit, AfterViewInit {

  constructor(private js: JsService) { }

  ngOnInit() {
    // setTimeout(() => {
    // }, 1000)
    // this.js.jsHomeUser();
  }

  ngAfterViewInit(){
    
  }


}
