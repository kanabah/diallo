import { JsService } from 'src/app/services/js.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-admi',
  templateUrl: './nav-admi.component.html',
  styleUrls: ['./nav-admi.component.css']
})
export class NavAdmiComponent implements OnInit {

  constructor(private js: JsService) { }

  ngOnInit() {
    this.js.jsAdmi();
  }

}
