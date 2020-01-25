import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScriptStore } from '../services/dynamic-loader.service';

@Component({
  selector: 'app-footer-user',
  templateUrl: './footer-user.component.html',
  styleUrls: ['./footer-user.component.css']
})
export class FooterUserComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
    // setTimeout(() => {
    // }, 1000)
  }

  ngAfterViewInit(){
    
  }


}
