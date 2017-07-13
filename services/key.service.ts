import { Injectable } from "@angular/core";
import { Subscribe } from "@/services/subscribe";
import * as js from "libraryjs";

@Injectable()
export class KeyService {

  events:any = {};

  space:number =       32;
  esc:number =         27;
  enter:number =       13;
  shift:number =       16;
  ctrl:number =        17;
  alt:number =         18;
  backspace:number =   8;
  tab:number =         9;

  constructor() {
    var f = this;

    f.events.press = new js.Events();

    document.onkeyup = (keyup) => {
      f.events.press.run( keyup.keyCode );
      return false; //cancel browser reaction
    };
  }

}

@Injectable()
export class SubKeyService extends Subscribe {

  constructor(
    private key:KeyService
  ) {
    super();
    var f = this;
    f.service = key;
  }

}