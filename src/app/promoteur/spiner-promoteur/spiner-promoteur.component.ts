import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spiner-promoteur',
  templateUrl: './spiner-promoteur.component.html',
  styleUrls: ['./spiner-promoteur.component.css']
})
export class SpinerPromoteurComponent implements OnInit {
  @Input() ok: any;
  constructor() { }

  ngOnInit() {
  }

}
