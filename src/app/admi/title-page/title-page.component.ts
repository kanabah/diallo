import { JsService } from './../../services/js.service';
import { PrintClientService } from './../../services/print-client.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.css']
})
export class TitlePageComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() image: string;
  @Input() icons: string;
  constructor(public print: PrintClientService, private js: JsService) { }

  ngOnInit() {
    // this.js.jsAdmiTitle()
  }

}
