import { Component, Injector } from "@angular/core";

@Component({
  selector: "msg-dialog",
  templateUrl: "./msg.html"
})
export class MsgDialogComponent {
  inputs:any = {};

  constructor(private injector: Injector) {
    var f = this;
    f.inputs.msg = f.injector.get("msg");
    f.inputs.exit = f.injector.get("exit");
  }
}