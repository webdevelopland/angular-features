import { Injectable } from "@angular/core";
import { Subscribe } from "@/services/subscribe";
import * as js from "libraryjs";


@Injectable()
export class GeoService {

  w:number;
  h:number;
  events:any = {};

  constructor() {
    var f = this;

    f.events.resize = new js.Events();

    window.onresize = () => {
      f.resize();
      f.events.resize.idrun();
    };
    
    f.resize();

  }

  resize() {
    var f = this;

    if (window.innerWidth) {
      f.w = window.innerWidth;
      f.h = window.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientWidth) {
      f.w = document.documentElement.clientWidth;
      f.h = document.documentElement.clientHeight;
    }
    else {
      f.w = document.body.clientWidth;
      f.h = document.body.clientHeight;
    }
    
  }

}