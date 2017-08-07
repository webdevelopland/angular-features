import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { RecaptchaService } from "./recaptcha.service";

@Component({
  selector: "recaptcha",
  templateUrl: "./recaptcha.html"
})
export class RecaptchaComponent implements OnInit {
  @Input() sitekey;
  @Output() callback = new EventEmitter();
  @ViewChild("recaptcha") recaptcha; 
  id:string;
  refreshIndex:number = 0;

  constructor(
    private service:RecaptchaService
  ) {}

  ngOnInit() {
    var f = this;
    //OnInit is necessary to make @Input work
    f.create();
  }

  create() {
    var f = this;
    f.id = f.service.getID();

    var child = document.createElement("div");
    child.id = f.id + "r"+f.refreshIndex;
    f.recaptcha.nativeElement.appendChild(child);
    
    f.service.render({
      component: f,
      id: child.id,
      sitekey: f.sitekey,
      callback: (res) => {
        f.callback.emit({
          id: child.id,
          response: res
        });
      }
    });
  }

  refresh() {
    var f = this;

    while (f.recaptcha.nativeElement.firstChild) {
      f.recaptcha.nativeElement.removeChild(f.recaptcha.nativeElement.firstChild);
    }
    f.refreshIndex++;
    f.create();
  }
}