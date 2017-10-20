import { Component, Injector } from "@angular/core";

@Component({
  selector: "yesno-dialog",
  templateUrl: "./yesno.html"
})
export class YesnoDialogComponent {
  inputs:any = {};

  constructor(private injector: Injector) {
    var f = this;
    f.inputs.msg = f.injector.get("msg");
    f.inputs.exit = f.injector.get("exit");
  }
}