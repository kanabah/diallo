import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeekService {

  constructor() { }

  public getWeekNumber(date){
    var d: any = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart: any = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
  };
}
