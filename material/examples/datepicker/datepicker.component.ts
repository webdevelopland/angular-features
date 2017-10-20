import { Component } from "@angular/core";
//https://momentjs.com/downloads/moment.js
declare var moment:any;

@Component({
  templateUrl: "./datepicker.html"
})
export class DatepickerComponent {
  date:any;

  constructor(
    public title:Title
  ) {
    var f = this;
    f.title.setTitle("Second Page");
  }

  onChange(event) {
    this.date = moment(event.value).format("DD MMM YYYY");
  }

}