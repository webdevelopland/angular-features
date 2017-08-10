import { Injectable } from "@angular/core";
import * as js from "libraryjs";

import { MsgDialogComponent } from "@/components/dialog/msg/msg.component";
import { YesnoDialogComponent } from "@/components/dialog/yesno/yesno.component";

@Injectable()
export class DialogManagerService {
  component:any;
  onclose:js.Events = new js.Events();
}

@Injectable()
export class DialogService {
  constructor( private service:DialogManagerService ) {}

  msg(msg:string) {
    var f = this;
    f.service.component.fadeIn({
      component: MsgDialogComponent,
      inputs: {
        msg: msg,
        exit: () => {
          f.service.component.fadeOut();
        }
      }
    });
  }

  yesno(msg:string, callback:Function) {
    var f = this;
    var isClosed = false;
    f.service.component.fadeIn({
      component: YesnoDialogComponent,
      inputs: {
        msg: msg,
        exit: (answer) => {
          if (isClosed) return;
          callback(answer);
          isClosed = true;
          f.service.component.fadeOut();
        }
      }
    });
    f.service.onclose.push((id) => {
      f.service.onclose.remove(id);
      if (isClosed) return;
      callback(false);
    });
  }
}