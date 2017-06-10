import { Injectable } from "@angular/core";
import { Subscribe } from "@/service/subscribe";
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

@Injectable()
export class SubGeoService extends Subscribe {

  constructor(
    private geo:GeoService
  ) {
    super();
    var f = this;
    f.service = geo;
  }

}