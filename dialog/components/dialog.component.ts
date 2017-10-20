import { Component, ViewChild } from "@angular/core";
import { DialogManagerService } from "@/services/dialog.service";
import * as js from "libraryjs";

@Component({
  selector: "dialog-container",
  templateUrl: "./dialog.html"
})
export class DialogComponent {
  isHidden:boolean = true;
  css:any = {};
  componentData = null;

  constructor(
    private dialog:DialogManagerService
  ) {
    var f = this;
    dialog.component = f;
  }
  open(param:any) {
    var f = this;
    
    if (js.is(param.w)) f.css.width = param.w; else f.css.width = null;
    if (js.is(param.h)) f.css.height = param.h; else f.css.height = null;

    f.componentData = {
      component: param.component,
      inputs: param.inputs
    };

    f.isHidden = false;
  }
  close() {
    var f = this;

    f.isHidden = true;
    f.dialog.onclose.idrun();
  }

  fadeIn(param:any) {
    var f = this;
    f.css.marginTop = 100;
    f.css.opacity = 0;
    f.css.transition = null;
    f.open(param);
    new js.Timeout(10, () => {
      f.css.transition = "margin-top .3s, opacity .3s";
      f.css.marginTop = 0;
      f.css.opacity = 1;
    });
  }
  fadeOut() {
    var f = this;
    f.css.marginTop = 100;
    f.css.opacity = 0;
    new js.Timeout(300, () => {
      f.close();
    });
  }
}