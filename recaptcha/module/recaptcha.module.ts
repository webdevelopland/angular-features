import { NgModule } from "@angular/core";
import { RecaptchaComponent } from "./recaptcha.component";
import { RecaptchaService } from "./recaptcha.service";

@NgModule({
  imports: [],
  exports: [
    RecaptchaComponent
  ],
  declarations: [
    RecaptchaComponent
  ],
  providers: [
    RecaptchaService
  ]
})
export class RecaptchaModule {}
