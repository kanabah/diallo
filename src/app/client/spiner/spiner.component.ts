import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spiner',
  templateUrl: './spiner.component.html',
  styleUrls: ['./spiner.component.css']
})
export class SpinerComponent implements OnInit {
  @Input() ok: any;
  constructor() { }

  ngOnInit() {
  }

}
