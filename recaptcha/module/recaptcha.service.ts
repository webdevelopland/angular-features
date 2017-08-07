import { Injectable } from "@angular/core";
import * as js from "libraryjs";

declare var grecaptcha:any;

@Injectable()
export class RecaptchaService {
  isLoaded:boolean = false;
  queue:Array<any> = [];
  id:number = 0;
  list:js.Arc = new js.Arc();
  components:js.Arc = new js.Arc();

  constructor() {
    var f = this;

    window["reCaptchaOnloadCallback"] = () => {
      f.isLoaded = true;
      //launch queue
      for(let id of f.queue) {
        f.add(id);
      }
    };

    f.load();

  }

  getID() {
    var f = this;
    return "recaptcha" + f.id++;
  }

  render(data:any) {
    var f = this;

    f.components.add(data.id, data.component);
    var parameters = {
      "sitekey": data.sitekey,
      "callback": data.callback
    };
    f.list.add(data.id, parameters);

    if (!f.isLoaded) {
      //to get in queue
      f.queue.push(data.id);
      return;
    }

    f.add(data.id);
  }

  private add(id:string) {
    var f = this;
    var parameters = f.list.value(id);
    grecaptcha.render(id, parameters);
  }

  reset(id:string) {
    var f = this;
    if (!f.isLoaded) return;

    f.list.remove(id);
    f.components.value(id).refresh();
    f.components.remove(id);
  }

  load() {
    var f = this;

    var script = document.createElement("script");
    script.innerHTML = "";
    script.src = "https://www.google.com/recaptcha/api.js?onload=reCaptchaOnloadCallback&render=explicit";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
}