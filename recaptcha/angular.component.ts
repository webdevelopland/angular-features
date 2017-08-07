import { Component } from "@angular/core";
import { RecaptchaService } from "@/modules/recaptcha/recaptcha.service";
import { HttpService } from "@/services/http.service";

@Component({
  templateUrl: "./template.html"
})
export class RecaptchaComponent {
  constructor(
    public http:HttpService,
    public recaptcha:RecaptchaService
  ) {}

  callback(event) {
    var f = this;

    f.http.post({
      url: "/ajax",
      json: {
        ajax: "recaptcha",
        recaptchaResponse: event.response
      },
      callback: (res) => {
        f.recaptcha.reset(event.id);

        if (res.error) {
          // Error
          return;
        }

        var result = JSON.parse(res.pkg);
        if (result.success) {
          // Success
        }
        else {
          // Wrong enter ?
        }
      }
    });
  }

}