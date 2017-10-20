// ...
import { RecaptchaModule } from "@/modules/recaptcha/RecaptchaModule";

// ———————————————————————————————— NgModule ————————————————————————————————
@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    // ...

    RecaptchaModule,

    // ...
  ],
  providers: [
    // ...
  ],
  bootstrap: [ AngularComponent ]
})
export class AngularModule {}
