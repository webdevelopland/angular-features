import { Injectable } from "@angular/core";
import * as js from "libraryjs";

//https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.4/howler.core.min.js
//npm i howler --save
declare var Howl:any;

@Injectable()
export class SoundService {
  list:js.Arc;
  constructor() {
    var f = this;
    f.list = new js.Arc();
  }
  add(name, url) {
    var f = this;
    var sound = new Howl({
      src: [url]
    });
    f.list.add(name, sound);
  }
  play(name) {
    var f = this;
    f.list.value(name).play();
  }
}